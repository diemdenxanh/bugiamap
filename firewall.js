// Hệ thống tường lửa
class Firewall {
    constructor() {
        this.isEnabled = true;
        this.blacklistedIPs = new Set();
        this.whitelistedIPs = new Set(['127.0.0.1']); // IP localhost luôn được cho phép
        this.requestLimits = new Map();
        this.suspiciousActivities = new Map();
        
        // Cấu hình
        this.config = {
            MAX_REQUESTS_PER_MINUTE: 100,
            SUSPICIOUS_THRESHOLD: 5,
            BLOCK_DURATION: 24 * 60 * 60 * 1000, // 24 giờ
            AUTO_UNBLOCK_ENABLED: true
        };
    }

    // Bật/tắt tường lửa
    toggleFirewall(enable = true) {
        this.isEnabled = enable;
        this.logAction('firewall_toggle', { status: enable ? 'enabled' : 'disabled' });
        return this.isEnabled;
    }

    // Thêm IP vào whitelist
    addToWhitelist(ip) {
        this.whitelistedIPs.add(ip);
        this.blacklistedIPs.delete(ip); // Xóa khỏi blacklist nếu có
        this.logAction('whitelist_add', { ip });
    }

    // Xóa IP khỏi whitelist
    removeFromWhitelist(ip) {
        this.whitelistedIPs.delete(ip);
        this.logAction('whitelist_remove', { ip });
    }

    // Kiểm tra IP có được phép truy cập
    async checkAccess(ip) {
        if (!this.isEnabled) return true;
        if (this.whitelistedIPs.has(ip)) return true;
        if (this.blacklistedIPs.has(ip)) return false;

        // Kiểm tra giới hạn request
        return this.checkRequestLimit(ip);
    }

    // Kiểm tra giới hạn request
    checkRequestLimit(ip) {
        const now = Date.now();
        const requestData = this.requestLimits.get(ip) || { count: 0, timestamp: now };

        // Reset counter nếu đã qua 1 phút
        if (now - requestData.timestamp > 60000) {
            requestData.count = 1;
            requestData.timestamp = now;
        } else {
            requestData.count++;
        }

        this.requestLimits.set(ip, requestData);

        // Chặn nếu vượt quá giới hạn
        if (requestData.count > this.config.MAX_REQUESTS_PER_MINUTE) {
            this.blockIP(ip);
            return false;
        }

        return true;
    }

    // Chặn IP
    blockIP(ip, duration = this.config.BLOCK_DURATION) {
        this.blacklistedIPs.add(ip);
        this.logAction('ip_blocked', { ip });

        // Tự động mở chặn sau thời gian định sẵn
        if (this.config.AUTO_UNBLOCK_ENABLED) {
            setTimeout(() => {
                this.unblockIP(ip);
            }, duration);
        }
    }

    // Mở chặn IP
    unblockIP(ip) {
        this.blacklistedIPs.delete(ip);
        this.logAction('ip_unblocked', { ip });
    }

    // Ghi log hành động
    async logAction(action, details) {
        try {
            await firebase.firestore().collection('firewall_logs').add({
                action,
                details,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Lỗi ghi log tường lửa:', error);
        }
    }

    // Lấy trạng thái tường lửa
    getStatus() {
        return {
            enabled: this.isEnabled,
            blacklistedCount: this.blacklistedIPs.size,
            whitelistedCount: this.whitelistedIPs.size,
            activeRequests: this.requestLimits.size
        };
    }
}

// Khởi tạo và xuất instance
const firewall = new Firewall();
export default firewall; 