const CONTENT_MANIFEST = [
  {
    src: require("@/assets/bg/bg_land.png"),
    id: "bg_main_land_texture",
    type: "image",
  },
  {
    src: require("@/assets/bg/bg_cloud.png"),
    id: "bg_main_cloud_texture",
    type: "image",
  },
  {
    src: require("@/assets/bg/bg_gezi.png"),
    id: "bg_main_gezi_texture",
    type: "image",
  },
  {
    src: require("@/assets/bg/bg_yezhu.png"),
    id: "bg_main_yezhu_texture",
    type: "image",
  },
  {
    src: require("@/assets/bg/bg_tree.png"),
    id: "bg_main_tree_texture",
    type: "image",
  },
  {
    src: require("@/assets/slime/slime_bin__47_48_76/slime_bin__47_48_76.png"),
    id: "slime_bin__47_48_76",
    type: "image",
  },
  {
    src: require("@/assets/slime/slime_feng__52_53_81/slime_feng__52_53_81.png"),
    id: "slime_feng__52_53_81",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_guo_slime_huo__74_102/decor_guo_slime_huo__74_102.png"),
    id: "decor_guo_slime_huo__74_102",
    type: "image",
  },
  {
    src: require("@/assets/slime/slime_huo__41_42/slime_huo__41_42.png"),
    id: "slime_huo__41_42",
    type: "image",
  },
  {
    src: require("@/assets/slime/slime_lei__43_44/slime_lei__43_44.png"),
    id: "slime_lei__43_44",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_lsj__37/decor_lsj__37.png"),
    id: "decor_lsj__37",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_qiqiu_slime_feng__78_79/decor_qiqiu_slime_feng__78_79.png"),
    id: "decor_qiqiu_slime_feng__78_79",
    type: "image",
  },
  {
    src: require("@/assets/slime/slime_yan__54_55_82/slime_yan__54_55_82.png"),
    id: "slime_yan__54_55_82",
    type: "image",
  },
  {
    src: require("@/assets/slime/slime_shui__39_40/slime_shui__39_40.png"),
    id: "slime_shui__39_40",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_beng__82_81_108/decor_beng__82_81_108.png"),
    id: "decor_beng__82_81_108",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_wo_slime_yan__83_107/decor_wo_slime_yan__83_107.png"),
    id: "decor_wo_slime_yan__83_107",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_wutai__12/decor_wutai__12.png"),
    id: "decor_wutai__12",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_hua_slime_cao__49_84/decor_hua_slime_cao__49_84.png"),
    id: "decor_hua_slime_cao__49_84",
    type: "image",
  },
  {
    src: require("@/assets/vist/vist_qiu_decor_hua_slime_cao__57_58_59/vist_qiu_decor_hua_slime_cao__57_58_59.png"),
    id: "vist_qiu_decor_hua_slime_cao__57_58_59",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_kaorou__57_58_101/decor_kaorou__57_58_101.png"),
    id: "decor_kaorou__57_58_101",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_xueshan__35_76/decor_xueshan__35_76.png"),
    id: "decor_xueshan__35_76",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_watu__35/decor_watu__35.png"),
    id: "decor_watu__35",
    type: "image",
  },
  {
    src: require("@/assets/other/other_yun__35/other_yun__35.png"),
    id: "other_yun__35",
    type: "image",
  },
  {
    src: require("@/assets/vist/vist_molong__70/vist_molong__70.png"),
    id: "vist_molong__70",
    type: "image",
  },
  {
    src: require("@/assets/vist/vist_longxi__68_69/vist_longxi__68_69.png"),
    id: "vist_longxi__68_69",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_biaoben__68_69_109/decor_biaoben__68_69_109.png"),
    id: "decor_biaoben__68_69_109",
    type: "image",
  },
  {
    src: require("@/assets/vist/vist_bao_slime_huo__60_61_62_63/vist_bao_slime_huo__60_61_62_63.png"),
    id: "vist_bao_slime_huo__60_61_62_63",
    type: "image",
  },
  {
    src: require("@/assets/decor/decor_fadian__75/decor_fadian__75.png"),
    id: "decor_fadian__75",
    type: "image",
  },
  {
    src: require("@/assets/vist/vist_leiqiu_decor_jianba__67_104/vist_leiqiu_decor_jianba__67_104.png"),
    id: "vist_leiqiu_decor_jianba__67_104",
    type: "image",
  },
  {
    src: require("@/assets/vist/vist_dawei__71_72_73/vist_dawei__71_72_73.png"),
    id: "vist_dawei__71_72_73",
    type: "image",
  },
  {
    src: require("@/assets/vist/vist_pianpian__64_65_66/vist_pianpian__64_65_66.png"),
    id: "vist_pianpian__64_65_66",
    type: "image",
  },
  {
    src: require("@/assets/other/other__85_86/other__85_86.png"),
    id: "other__85_86",
    type: "image",
  },
  {
    src: require("@/assets/slime/slime_lei_huo__45/slime_lei_huo__45.png"),
    id: "slime_lei_huo__45",
    type: "image",
  },
  {
    src: require("@/assets/slime/slime_lei_shui__46/slime_lei_shui__46.png"),
    id: "slime_lei_shui__46",
    type: "image",
  },
]

export default CONTENT_MANIFEST