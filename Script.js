// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOAXwy9u2VulNga1hGzie1B01PSs1BXck",
    authDomain: "webdu-34408.firebaseapp.com",
    projectId: "webdu-34408",
    storageBucket: "webdu-34408.firebasestorage.app",
    messagingSenderId: "732910129756",
    appId: "1:732910129756:web:7118dd3b7c7ec8e2124c99",
    measurementId: "G-YEBQJQ4BZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// phần tử 
const modal = document.getElementById("auth-modal");
const authTitle = document.getElementById("auth-title");
const authSubmit = document.getElementById("auth-submit");
const toggleAuth = document.getElementById("toggle-auth");
const registerFields = document.getElementById("register-fields");

// Call animation function when modal is opened
document.getElementById("login").addEventListener("click", () => {
    setTimeout(addFormAnimations, 100);
});

// Form animation
var current_fs, next_fs, previous_fs;
var left, opacity, scale;
var animating;

$(".next").click(function(){
    if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    next_fs.show();
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            scale = 1 - (1 - now) * 0.2;
            left = (now * 50)+"%";
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale('+scale+')',
                'position': 'absolute'
            });
            next_fs.css({'left': left, 'opacity': opacity});
        }, 
        duration: 800,
        complete: function(){
            current_fs.hide();
            animating = false;
        },
        easing: 'easeInOutBack'
    });
});

$(".previous").click(function(){
    if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    previous_fs.show();
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            scale = 0.8 + (1 - now) * 0.2;
            left = ((1-now) * 50)+"%";
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
        },
        duration: 800,
        complete: function(){
            current_fs.hide();
            animating = false;
        },
        easing: 'easeInOutBack'
    });
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    switchToLoginMode();
    updateAuthStatus();
});

function initMap() {
    const map = new google.maps.Map(document.getElementById("google-map"), {
        zoom: 6,
        center: { lat: 21.0285, lng: 105.8542 },  // Trung tâm của Hà Nội
    });

    const locations = [
        { name: "Hà Nội", lat: 21.028511, lng: 105.804817 },
        { name: "Sapa", lat: 22.340000, lng: 103.844000 },
        { name: "Măng Đen", lat: 14.598000, lng: 108.394000 }
    ];

    locations.forEach(location => {
        new google.maps.Marker({
            position: location,
            map,
            title: location.name
        });
    });
}

// Load Google Maps
window.onload = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
};

// Khởi tạo AOS
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1000,
        once: true
    });
});

// Chọn các nút chuyển ngôn ngữ
document.getElementById("lang-vi").addEventListener("click", function() {
    setLanguage('vi');
});

document.getElementById("lang-en").addEventListener("click", function() {
    setLanguage('en');
});

var respon=window.innerWidth>992,numDes=4,numMB=1,leaveDes=8,leaveMob=6,numLeavesWind=respon?leaveDes:leaveMob,windSpeed=respon?numDes:numMB,LeafScene=function(t){this.viewport=t,this.world=document.createElement("div"),this.leaves=[],this.options={numLeaves:numLeavesWind,wind:{magnitude:1.2,maxSpeed:windSpeed,duration:100,start:0,speed:0}},this.width=this.viewport.offsetWidth,this.height=this.viewport.offsetHeight,this.timer=0,this._resetLeaf=function(t){t.x=2*this.width-Math.random()*this.width*1.75,t.y=-10,t.z=200*Math.random(),t.x>this.width&&(t.x=this.width+10,t.y=Math.random()*this.height/2),0==this.timer&&(t.y=Math.random()*this.height),t.rotation.speed=10*Math.random();var e=Math.random();return e>.5?t.rotation.axis="X":e>.25?(t.rotation.axis="Y",t.rotation.x=180*Math.random()+90):(t.rotation.axis="Z",t.rotation.x=360*Math.random()-180,t.rotation.speed=3*Math.random()),t.xSpeedVariation=.8*Math.random()-.4,t.ySpeed=Math.random()+1.5,t},this._updateLeaf=function(t){var e=this.options.wind.speed(this.timer-this.options.wind.start,t.y)+t.xSpeedVariation;t.x-=e,t.y+=t.ySpeed,t.rotation.value+=t.rotation.speed;var i="translateX( "+t.x+"px ) translateY( "+t.y+"px ) translateZ( "+t.z+"px )  rotate"+t.rotation.axis+"( "+t.rotation.value+"deg )";"X"!==t.rotation.axis&&(i+=" rotateX("+t.rotation.x+"deg)"),t.el.style.webkitTransform=i,t.el.style.MozTransform=i,t.el.style.oTransform=i,t.el.style.transform=i,(t.x<-10||t.y>this.height+10)&&this._resetLeaf(t)},this._updateWind=function(){if(0===this.timer||this.timer>this.options.wind.start+this.options.wind.duration){this.options.wind.magnitude=Math.random()*this.options.wind.maxSpeed,this.options.wind.duration=50*this.options.wind.magnitude+(20*Math.random()-10),this.options.wind.start=this.timer;var t=this.height;this.options.wind.speed=function(e,i){var a=this.magnitude/1.5*(t-2*i/3)/t;return a*Math.sin(2*Math.PI/this.duration*e+3*Math.PI/2)+a}}}};LeafScene.prototype.init=function(){for(var t=0;t<this.options.numLeaves;t++){var e={el:document.createElement("div"),x:80,y:80,z:80,rotation:{axis:"X",value:200,speed:100,x:0},xSpeedVariation:0,ySpeed:0,path:{type:1,start:0},image:1};this._resetLeaf(e),this.leaves.push(e),this.world.appendChild(e.el)}this.world.className="leaf-scene",this.viewport.appendChild(this.world),this.world.style.webkitPerspective="1440px",this.world.style.MozPerspective="1440px",this.world.style.oPerspective="1440px",this.world.style.perspective="1440px";var i=this;window.onresize=function(t){i.width=i.viewport.offsetWidth,i.height=i.viewport.offsetHeight}},LeafScene.prototype.render=function(){this._updateWind();for(var t=0;t<this.leaves.length;t++)this._updateLeaf(this.leaves[t]);this.timer++,requestAnimationFrame(this.render.bind(this))};var leafContainer=document.querySelector(".falling-leaves"),leaves=new LeafScene(leafContainer);leaves.init(),leaves.render();

// Hiệu ứng cho phần điểm đến
document.addEventListener('DOMContentLoaded', () => {
    const destinationCards = document.querySelectorAll('.destination-card');

    // Thêm hiệu ứng hover
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
            card.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });

    // Hiệu ứng xuất hiện khi scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    destinationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease-out';
        observer.observe(card);
    });

    // Hiệu ứng cho hình ảnh
    const destinationImages = document.querySelectorAll('.destination-card img');
    destinationImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.5s ease';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
});

// Kiểm tra và khởi tạo hiệu ứng
class EffectsManager {
    constructor() {
        this.checkContainers();
        this.initializeEffects();
    }

    // Kiểm tra containers
    checkContainers() {
        console.log('🔍 Kiểm tra containers...');
        
        const effectsContainer = document.querySelector('.effects-container');
        const snowContainer = document.querySelector('.snowflakes');
        const sakuraContainer = document.getElementById('sakura-container');

        if (!effectsContainer) {
            console.error('❌ Không tìm thấy effects-container');
            this.createContainer('effects-container');
        }
        if (!snowContainer) {
            console.error('❌ Không tìm thấy snowflakes container');
            this.createSnowContainer();
        }
        if (!sakuraContainer) {
            console.error('❌ Không tìm thấy sakura-container');
            this.createSakuraContainer();
        }
    }

    // Tạo container nếu chưa tồn tại
    createContainer(className) {
        console.log(`📦 Tạo container mới: ${className}`);
        const container = document.createElement('div');
        container.className = className;
        document.body.prepend(container);
        return container;
    }

    // Tạo container tuyết
    createSnowContainer() {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'snowflakes';
        snowContainer.setAttribute('aria-hidden', 'true');
        
        // Thêm 18 bông tuyết
        for (let i = 0; i < 18; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = i % 2 === 0 ? '❅' : '❆';
            snowContainer.appendChild(snowflake);
        }

        document.querySelector('.effects-container')?.appendChild(snowContainer);
    }

    // Tạo container hoa anh đào
    createSakuraContainer() {
        const sakuraContainer = document.createElement('div');
        sakuraContainer.id = 'sakura-container';
        document.querySelector('.effects-container')?.appendChild(sakuraContainer);
    }

    // Khởi tạo hiệu ứng
    initializeEffects() {
        console.log('🚀 Khởi tạo hiệu ứng...');
        
        // Kiểm tra CSS
        this.checkStyles();

        // Tạo hiệu ứng hoa anh đào
        this.createSakuraEffect();

        // Theo dõi hiệu năng
        this.monitorPerformance();
    }

    // Kiểm tra CSS đã được load
    checkStyles() {
        const styles = document.styleSheets;
        let hasEffectStyles = false;

        for (let style of styles) {
            try {
                if (style.cssRules) {
                    for (let rule of style.cssRules) {
                        if (rule.selectorText === '.sakura' || rule.selectorText === '.snowflake') {
                            hasEffectStyles = true;
                            break;
                        }
                    }
                }
            } catch (e) {
                console.warn('⚠️ Không thể đọc stylesheet:', e);
            }
        }

        if (!hasEffectStyles) {
            console.error('❌ CSS cho hiệu ứng chưa được load');
        } else {
            console.log('✅ CSS đã được load thành công');
        }
    }

    // Tạo hiệu ứng hoa anh đào
    createSakuraEffect() {
        const createSakura = () => {
            const container = document.getElementById('sakura-container');
            if (!container) return;

            const sakura = document.createElement('div');
            sakura.className = 'sakura';
            sakura.style.left = Math.random() * 100 + '%';
            sakura.style.animationDuration = 5 + Math.random() * 5 + 's';
            
            container.appendChild(sakura);
            
            setTimeout(() => sakura.remove(), 10000);
        };

        // Tạo hoa ban đầu
        for (let i = 0; i < 20; i++) {
            createSakura();
        }

        // Tạo hoa liên tục
        setInterval(createSakura, 300);
    }

    // Theo dõi hiệu năng
    monitorPerformance() {
        setInterval(() => {
            const sakuraCount = document.querySelectorAll('.sakura').length;
            const snowCount = document.querySelectorAll('.snowflake').length;
            
            console.log(`📊 Hiệu năng: ${sakuraCount} hoa, ${snowCount} bông tuyết`);
            
            if (sakuraCount > 100 || snowCount > 50) {
                console.warn('⚠️ Số lượng hiệu ứng cao, có thể ảnh hưởng hiệu năng');
            }
        }, 5000);
    }
}

// Khởi tạo khi trang đã load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌸 Bắt đầu khởi tạo hiệu ứng...');
    const effects = new EffectsManager();
});

// Xử lý khi tab ẩn/hiện
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('📱 Tab ẩn, tạm dừng hiệu ứng');
        document.getElementById('sakura-container').innerHTML = '';
    } else {
        console.log('📱 Tab hiện, khởi động lại hiệu ứng');
        new EffectsManager();
    }
});

// Thêm Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe tất cả destination cards
    document.querySelectorAll('.destination-card').forEach((card) => {
        observer.observe(card);
    });
});

function createSakura() {
    const container = document.getElementById('sakura-container');
    const sakura = document.createElement('div');
    sakura.className = 'sakura';
    
    // Random vị trí bắt đầu
    sakura.style.left = Math.random() * 100 + '%';
    
    // Random thời gian rơi
    const fallDuration = Math.random() * 5 + 5; // 5-10s
    sakura.style.animationDuration = fallDuration + 's';
    
    container.appendChild(sakura);
    
    // Xóa hoa sau khi animation kết thúc
    setTimeout(() => {
        sakura.remove();
    }, fallDuration * 1000);
}

// Tạo hoa anh đào mới mỗi 300ms
setInterval(createSakura, 300);

// Tối ưu hiệu năng
document.addEventListener('visibilitychange', () => {
    const container = document.getElementById('sakura-container');
    const snowflakes = document.querySelector('.snowflakes');
    
    if (document.hidden) {
        container.style.display = 'none';
        snowflakes.style.display = 'none';
    } else {
        container.style.display = 'block';
        snowflakes.style.display = 'block';
    }
});

// Dừng animation khi người dùng không tương tác
let timeout;
document.addEventListener('mousemove', () => {
    clearTimeout(timeout);
    document.body.classList.remove('pause-animations');
    
    timeout = setTimeout(() => {
        document.body.classList.add('pause-animations');
    }, 5000);
});
    