export const studentNavigations = [
    { name: 'Anasayfa', path: '/dashboard/default', icon: 'dashboard' },
    { label: 'EĞİTMEN SAYFALARI', type: 'label' },
    {
        name: 'Tanımlar',
        icon: 'launch',
        children: [
            { name: 'Video Kategori Tanımı', iconText: 'SI', path: '/session/signin' },
        ]
    },

    { label: 'KULLANICI SAYFALARI', type: 'label' },
    {
        name: 'Eğitimler',
        icon: 'launch',
        path: '/student/videolistall'
    },
    {
        name: 'Kütüphanem',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/'
    },

    {
        name: 'Profil Bilgileri',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/'
    },
    {
        name: 'Şifre Değiştir',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/'
    },





    { label: 'Components', type: 'label' },
    {
        name: 'Components',
        icon: 'favorite',
        badge: { value: '30+', color: 'secondary' },
        children: [
            { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
            { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
            { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
            { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
            { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
            { name: 'Form', path: '/material/form', iconText: 'F' },
            { name: 'Icons', path: '/material/icons', iconText: 'I' },
            { name: 'Menu', path: '/material/menu', iconText: 'M' },
            { name: 'Progress', path: '/material/progress', iconText: 'P' },
            { name: 'Radio', path: '/material/radio', iconText: 'R' },
            { name: 'Switch', path: '/material/switch', iconText: 'S' },
            { name: 'Slider', path: '/material/slider', iconText: 'S' },
            { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
            { name: 'Table', path: '/material/table', iconText: 'T' }
        ]
    },
    {
        name: 'Charts',
        icon: 'trending_up',
        children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }]
    },
    {
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/'
    }

]