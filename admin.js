import { SecurityManager } from './security.js';
import { AdminSystem } from './admin.js';
import express from 'express';
import firewall from './firewall.js';

const securityManager = new SecurityManager();
await securityManager.initialize();

const admin = new AdminSystem();
await admin.initializeFirebaseAdmin();

if (await admin.validateAdminSession()) {
    // Thực hiện các thao tác admin
} else {
    // Yêu cầu đăng nhập lại
}

const app = express();

// API quản lý tường lửa
app.post('/admin/firewall/toggle', async (req, res) => {
    const { enabled } = req.body;
    const status = firewall.toggleFirewall(enabled);
    res.json({ status });
});

app.post('/admin/firewall/whitelist', async (req, res) => {
    const { ip } = req.body;
    firewall.addToWhitelist(ip);
    res.json({ success: true });
});

app.get('/admin/firewall/status', async (req, res) => {
    const status = firewall.getStatus();
    res.json(status);
});