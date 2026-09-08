# نشر Play Now على دومين مجاني

## الخيار 1 — GitHub Pages
1. أنشئ حساب GitHub.
2. أنشئ Repository جديدًا مثل `play-now`.
3. ارفع **محتويات هذا المجلد** إلى المستودع.
4. من Settings → Pages اختر النشر من الفرع الرئيسي ومن مجلد `/root`.
5. سيظهر الموقع على نطاق GitHub المجاني: `https://USERNAME.github.io/play-now/`.

## الخيار 2 — Cloudflare Pages
1. أنشئ حساب Cloudflare.
2. Pages → Create application → Connect to Git.
3. اختر Repository.
4. إذا رفعت المشروع كصفحة Static مباشرة، استخدم إعدادًا مناسبًا للمشروع أو ارفع مجلد الناتج من عملية البناء.
5. ستحصل على نطاق مجاني فرعي من Cloudflare Pages.

## مهم للنسخة الإنتاجية
- اربط Supabase للمستخدمين والبيانات متعددة الأجهزة.
- ضع مفاتيح الإعدادات العامة فقط في الواجهة؛ لا تضع كلمات مرور IPTV أو مفاتيح سرية داخل JavaScript العام.
- الفيديوهات الكبيرة يفضّل تخزينها في Object Storage/CDN وليس داخل GitHub.
