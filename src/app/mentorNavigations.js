export const mentorNavigations = [
    { name: 'Anasayfa', path: '/dashboard/default', icon: 'dashboard' },
    { label: 'EĞİTMEN SAYFALARI', type: 'label' },
    {
        name: 'Tanımlar',
        icon: 'launch',
        children: [
            { name: 'Video Kategori Tanımı', iconText: 'SI', path: '/session/signin' },
        ]
    },
    {
        name: 'Kullanıcı İşlemleri',
        icon: 'security',
        children: [

            { name: 'Kullanıcı Düzenle', iconText: 'SU', path: '/session/signup' },
            { name: 'Kullanıcı Videoları', iconText: 'FP', path: '/mentor/videolist-id' },

        ]
    },
    {
        name: 'Video Eğitim',
        icon: 'security',
        children: [
            { name: 'Eğitim Seti Oluştur', iconText: 'SI', path: '/mentor/create-edu' },
            { name: 'Video Ekle', iconText: 'SU', path: '/session/signup' },
            { name: 'Video Listele / Düzenle', iconText: 'FP', path: '/mentor/videolist-id' },

        ]
    },
    {
        name: 'Anket',
        icon: 'security',
        children: [
            { name: 'Anket Oluştur', iconText: 'SI', path: '/session/signin' },
            { name: 'Anket Düzenle', iconText: 'SU', path: '/session/signup' },
            { name: 'Tüm Anketler', iconText: 'SU', path: '/session/signup' },
            { name: 'Anket Sonuçları', iconText: 'FP', path: '/session/forgot-password' },
        ]
    },
    {
        name: 'Etkinlik',
        icon: 'security',
        children: [
            { name: 'Etkinlik Oluştur', iconText: 'SI', path: '/session/signin' },
            { name: 'Etkinlik Düzenle', iconText: 'SU', path: '/session/signup' },
            { name: 'Tüm Etkinlikler', iconText: 'FP', path: '/session/forgot-password' },
        ]
    },

]