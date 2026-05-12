import db from './db.js'

const solutionCategories = [
  {
    id: 1,
    name: "智能制造",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 2,
    name: "缺陷检测",
    parent_id: 1,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 3,
    name: "产线智能化跟踪及检测",
    parent_id: 1,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 4,
    name: "智慧工厂管理",
    parent_id: 1,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 5,
    name: "食品",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 6,
    name: "智慧餐厅",
    parent_id: 5,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 7,
    name: "生产卫生安全合规",
    parent_id: 5,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 8,
    name: "交通",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 9,
    name: "智慧交通",
    parent_id: 8,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 10,
    name: "加油站人车识别",
    parent_id: 8,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 11,
    name: "园区",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 12,
    name: "智慧食堂",
    parent_id: 11,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 13,
    name: "远程多园区安防集中管理",
    parent_id: 11,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 14,
    name: "智慧园区",
    parent_id: 11,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 15,
    name: "机场",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 16,
    name: "物流快递",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 17,
    name: "仓库管理",
    parent_id: 16,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 18,
    name: "物流分拣",
    parent_id: 16,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 19,
    name: "营业厅",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 20,
    name: "医院与实验室",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 21,
    name: "科研与临床无缝协作",
    parent_id: 20,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 22,
    name: "全流程智能化诊断支持",
    parent_id: 20,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  }
]

const solutions = [
  {
    id: 1,
    title: "科研与临床无缝协作",
    cover: "http://localhost/img/solutions/科研与临床无缝协作 - C.jpg",
    category_id: 21,
    description: "医疗科研协作方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 2,
    title: "全流程智能化诊断支持",
    cover: "http://localhost/img/solutions/全流程智能化诊断支持 - C.jpg",
    category_id: 22,
    description: "全流程医疗诊断方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 3,
    title: "智慧营业厅",
    cover: "http://localhost/img/solutions/智慧营业厅 - C.jpeg",
    category_id: 19,
    description: "营业厅智能化方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 4,
    title: "仓库管理",
    cover: "http://localhost/img/solutions/仓库管理 - C.png",
    category_id: 17,
    description: "物流仓库管理方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 5,
    title: "物流分拣",
    cover: "http://localhost/img/solutions/物流分拣 - C.png",
    category_id: 18,
    description: "物流智能分拣方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 6,
    title: "安防控制平台",
    cover: "http://localhost/img/solutions/安防控制平台 - C.png",
    category_id: 13,
    description: "园区安防控制方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 7,
    title: "智慧食堂",
    cover: "http://localhost/img/solutions/智慧食堂 - C.png",
    category_id: 12,
    description: "园区智慧食堂方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 8,
    title: "远程多园区安防集中管理",
    cover: "http://localhost/img/solutions/远程多园区安防集中管理 - C.jpg",
    category_id: 13,
    description: "多园区安防管理方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 9,
    title: "智慧园区",
    cover: "http://localhost/img/solutions/智慧园区 - C.png",
    category_id: 14,
    description: "智慧园区整体方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 10,
    title: "智慧交通",
    cover: "http://localhost/img/solutions/智慧交通 - C.png",
    category_id: 9,
    description: "智能交通管理方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 11,
    title: "加油站人车识别",
    cover: "http://localhost/img/solutions/加油站人车识别 - C.png",
    category_id: 10,
    description: "加油站人车识别方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 12,
    title: "智慧餐厅",
    cover: "http://localhost/img/solutions/智慧餐厅 - C.png",
    category_id: 6,
    description: "餐饮智能化方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 13,
    title: "生产卫生安全合规",
    cover: "http://localhost/img/solutions/生产卫生安全合规 - C.png",
    category_id: 7,
    description: "食品生产安全合规方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 14,
    title: "缺陷检测",
    cover: "http://localhost/img/solutions/缺陷检测 - C.png",
    category_id: 2,
    description: "产线缺陷检测方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 15,
    title: "产线智能化跟踪及检测",
    cover: "http://localhost/img/solutions/产线智能化跟踪及检测 - C.png",
    category_id: 3,
    description: "产线智能跟踪方案",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 16,
    title: "智慧工厂管理",
    cover: "http://localhost/img/solutions/智慧工厂管理 - C.png",
    category_id: 4,
    description: "工厂智能化管理方案",
    create_time: "2025/5/13",
    status: 1
  }
]

const solutionDetails = [
  {
    id: 1,
    title: "科研与临床无缝协作",
    description: "跨场景数据共享：打通医院检验科、病理科与科研实验室的数据壁垒，支持多模态数据的标准化存储与权限分级调用，加速科研成果向临床转化。人机协同审核机制：AI 预标注 + 人工修正模式，确保标注数据质量，为后续算法迭代提供可靠训练集。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 2,
    title: "全流程智能化诊断支持",
    description: "精准骨髓图像分析：通过高清扫描与 AI 图像识别技术，实现骨髓涂片百万级细胞自动定位、分类计数及异常形态识别，辅助医生快速出具诊断报告，准确率提升超 30%。AI 动态辅助决策：系统可实时分析患者骨髓细胞变化趋势，动态推荐治疗方案，减少误诊风险。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 3,
    title: "智慧营业厅",
    description: "智慧营业厅产品专注于服务提升，一方面严格督导服务规范和标准落地，确保每一位客户都能获得高质量服务；另一方面持续采集运营数据，通过对业务办理时长、客户流量等多维度信息的分析，为优化流程提供坚实依据；同时，借助智能手段直接测量用户获得的服务状况，精准洞察客户体验，及时发现并解决服务中的痛点与不足，助力营业厅服务水平持续进阶。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 4,
    title: "仓库管理",
    description: "智慧仓储管理应用于物流场景，解决快递面单脏污、遮挡、褶皱影响识别问题，支持高并发、快速分拣，配合传送带实现自动分拣，节约人工成本，识别率高达 97%。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 5,
    title: "物流分拣",
    description: "对传送带上高速运动的快递，自动识别物流面单的条形码和三段码信息，综合实现对快递的自动分拣，高效、精准，解决人眼疲劳产生的误判，可长时间稳定工作。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 6,
    title: "安防控制平台",
    description: "智慧社区 / 园区安防管理，包含禁区闯入侦测、烟雾火灾侦测、异常行为分析、视频浓缩等功能，有效降低误报率，保障园区安全。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 7,
    title: "智慧食堂",
    description: "智慧餐厅管理：用餐安全、环境安全、卫生指标、操作安全、后台管理一体化解决方案。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 8,
    title: "远程多园区安防集中管理",
    description: "远程多园区安防集中管理，实现全时段智能监控、异常自动告警、事后追溯数字化，解决人工监督不持续问题。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 9,
    title: "智慧园区",
    description: "智慧园区管理：提供主流 ERP 厂商数据集成服务，实现仓库建模、入库管理、出库管理、库内管理、仓库可视化等功能，提高管理效率，优化库存控制。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 10,
    title: "智慧交通",
    description: "交通智能监测：深度整合视频管理与 AI 识别技术，对交通场景全时段、多维度监控，解析车流量、违章行为，实现交通目标识别与轨迹追踪，提升交通管理效率。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 11,
    title: "加油站人车识别",
    description: "车流量统计：通过捕捉场景内车辆并在其穿越虚拟线后统计车流量；骨骼分析法异常行为分析：采用先进的骨骼分析 AI 算法侦测油站内人员行为姿态，在有人发生异常行为时主动告警；烟雾火灾侦测：一旦加油站内出现明火或烟雾，主动告警；禁区 / 周界闯入侦测：一旦有人闯入禁入区域即触发告警，同时结合 AI 深度学习过滤器可有效降低误报率；视频浓缩：跨时空精简录像视频以快速回放，将不同时间捕获的对象和事件在同一个画面同时进行显示。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 12,
    title: "智慧餐厅",
    description: "智慧餐厅管理：用餐安全、环境安全、卫生指标、操作安全、后台大屏可视化、公众号消息通知，全方位保障餐厅安全与运营效率。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 13,
    title: "生产卫生安全合规",
    description: "食品安全智慧监管：食品生产企业关键点远程非现场监管，基于 AI、IoT、大数据技术，实现生产环境数字化转型，保障生产安全。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 14,
    title: "缺陷检测",
    description: "缺陷检测是工业制造生产的关键环节，AI + 计算机视觉检测可检出随机、无规则瑕疵，全面替代人工，检测模型可不断学习迭代，实现完整业务管理数字化。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 15,
    title: "产线智能化跟踪及检测",
    description: "工业质检管理：产品融合智能传感与算法，实现生产线全流程动态跟踪，生产数据实时可视，高精度检测外观瑕疵、重量偏差及成分异常，保障产品品质与生产效率。",
    create_time: "2025/5/15",
    update_time: "2025/5/15",
    status: 1
  },
  {
    id: 16,
    title: "智慧工厂管理",
    description: "智慧工厂管理产品针对生产环境复杂、业务环节多的现状研发，聚焦人员管理与空间管理，解决人工监督手段缺乏持续性、缺少事后追溯数据等问题，是高效 AI 智慧厂区解决方案。",
    create_time: "2025/5/13",
    update_time: "2025/5/13",
    status: 1
  }
]

const solutionMaterials = [
  {
    id: 1,
    solution_id: 1,
    material_type: "image",
    file_url: "http://localhost/img/solutions/科研与临床无缝协作-C.jpg",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 2,
    solution_id: 2,
    material_type: "image",
    file_url: "http://localhost/img/solutions/全流程智能化诊断支持-C.jpg",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 3,
    solution_id: 3,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983228.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 4,
    solution_id: 3,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983227.jpg",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 5,
    solution_id: 3,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983226.jpg",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 6,
    solution_id: 4,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983221.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 7,
    solution_id: 4,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983225.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 8,
    solution_id: 4,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983224.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 9,
    solution_id: 4,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983223.png",
    sort: 4,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 10,
    solution_id: 4,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983222.png",
    sort: 5,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 11,
    solution_id: 5,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983220.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 12,
    solution_id: 5,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983219.gif",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 13,
    solution_id: 6,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983207.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 14,
    solution_id: 6,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983209.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 15,
    solution_id: 6,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983208.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 16,
    solution_id: 7,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983252.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 17,
    solution_id: 7,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983251.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 18,
    solution_id: 7,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983248.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 19,
    solution_id: 7,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983250.png",
    sort: 4,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 20,
    solution_id: 7,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983249.png",
    sort: 5,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 21,
    solution_id: 8,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983254.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 22,
    solution_id: 8,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983253.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 23,
    solution_id: 8,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983256.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 24,
    solution_id: 8,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983255.png",
    sort: 4,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 25,
    solution_id: 9,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983257.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 26,
    solution_id: 9,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983259.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 27,
    solution_id: 9,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983258.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 28,
    solution_id: 9,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983260.png",
    sort: 4,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 29,
    solution_id: 10,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983213.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 30,
    solution_id: 10,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983212.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 31,
    solution_id: 10,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983211.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 32,
    solution_id: 10,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983210.png",
    sort: 4,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 33,
    solution_id: 11,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983217.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 34,
    solution_id: 11,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983216.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 35,
    solution_id: 11,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983215.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 36,
    solution_id: 11,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983214.png",
    sort: 4,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 37,
    solution_id: 11,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983218.png",
    sort: 5,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 38,
    solution_id: 12,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983268.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 39,
    solution_id: 12,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983267.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 40,
    solution_id: 12,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983266.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 41,
    solution_id: 12,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983265.png",
    sort: 4,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 42,
    solution_id: 12,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983264.png",
    sort: 5,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 43,
    solution_id: 13,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983263.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 44,
    solution_id: 13,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983262.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 45,
    solution_id: 13,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983261.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 46,
    solution_id: 14,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983229.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 47,
    solution_id: 14,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983233.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 48,
    solution_id: 14,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983235.jpg",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 49,
    solution_id: 15,
    material_type: "video",
    file_url: "http://localhost/img/solutions/111111.mp4",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 50,
    solution_id: 15,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10993598.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 51,
    solution_id: 16,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983239.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 52,
    solution_id: 16,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983245.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 53,
    solution_id: 16,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983244.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 54,
    solution_id: 16,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983243.png",
    sort: 4,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 55,
    solution_id: 16,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983242.jpg",
    sort: 5,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 56,
    solution_id: 16,
    material_type: "image",
    file_url: "http://localhost/img/solutions/10983241.png",
    sort: 6,
    create_time: "2026/3/25 0:00",
    status: 1
  }
]

const productCategories = [
  {
    id: 1,
    name: "智慧空间管理",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 2,
    name: "智慧工厂",
    parent_id: 1,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 3,
    name: "明厨亮灶",
    parent_id: 1,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 4,
    name: "视频管理平台",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 5,
    name: "视频汇聚管理",
    parent_id: 4,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 6,
    name: "视频转换网关",
    parent_id: 4,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 7,
    name: "视频质量监测",
    parent_id: 4,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 8,
    name: "GIS 电子地图建模",
    parent_id: 4,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 9,
    name: "电子地图交互",
    parent_id: 4,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 10,
    name: "数字化信息平台",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 11,
    name: "大模型",
    parent_id: 0,
    description: "一级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 12,
    name: "智能客服和虚拟助手",
    parent_id: 11,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 13,
    name: "视觉辅助判断",
    parent_id: 11,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 14,
    name: "知识管理",
    parent_id: 11,
    description: "二级分类",
    create_time: "2026/3/25 0:00",
    status: 1
  }
]

const products = [
  {
    id: 1,
    title: "知识管理",
    cover: "http://localhost/img/products/知识管理-C.png",
    category_id: 14,
    description: "大模型知识管理",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 2,
    title: "智能客服和虚拟助手",
    cover: "http://localhost/img/products/智能客服和虚拟助手-C.png",
    category_id: 12,
    description: "大模型智能客服",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 3,
    title: "视觉辅助判断",
    cover: "http://localhost/img/products/视觉辅助判断-C.png",
    category_id: 13,
    description: "大模型视觉辅助",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 4,
    title: "数字化信息平台",
    cover: "http://localhost/img/products/数字化信息平台-C.png",
    category_id: 10,
    description: "数字化信息平台",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 5,
    title: "电子地图交互",
    cover: "http://localhost/img/products/电子地图交互-C.jpg",
    category_id: 9,
    description: "视频管理平台功能",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 6,
    title: "GIS 电子地图建模",
    cover: "http://localhost/img/products/GIS电子地图建模-C.png",
    category_id: 8,
    description: "视频管理平台功能",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 7,
    title: "视频质量监测",
    cover: "http://localhost/img/products/视频质量监测-C.png",
    category_id: 7,
    description: "视频管理平台功能",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 8,
    title: "视频转换网关",
    cover: "http://localhost/img/products/视频转换网关-C.png",
    category_id: 6,
    description: "视频管理平台功能",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 9,
    title: "视频汇聚管理",
    cover: "http://localhost/img/products/视频汇聚管理-C.png",
    category_id: 5,
    description: "视频管理平台核心",
    create_time: "2025/5/15",
    status: 1
  },
  {
    id: 10,
    title: "鼠患检测",
    cover: "http://localhost/img/products/鼠患检测-C.png",
    category_id: 3,
    description: "明厨亮灶检测能力",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 11,
    title: "厂区标准着装检测",
    cover: "http://localhost/img/products/标准着装检测-C.png",
    category_id: 2,
    description: "智慧工厂",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 12,
    title: "产线跟踪",
    cover: "http://localhost/img/products/产线跟踪-C.png",
    category_id: 2,
    description: "智慧工厂核心能力",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 13,
    title: "安防检测",
    cover: "http://localhost/img/products/安防检测-C.png",
    category_id: 2,
    description: "智慧工厂安防能力",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 14,
    title: "标准动作识别",
    cover: "http://localhost/img/products/标准动作识别-C.png",
    category_id: 2,
    description: "智慧工厂规范操作",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 15,
    title: "违规手机操作检测",
    cover: "http://localhost/img/products/违规手机操作检测-C.png",
    category_id: 2,
    description: "智慧工厂安全管控",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 16,
    title: "危险动作识别",
    cover: "http://localhost/img/products/危险动作识别-C.png",
    category_id: 2,
    description: "智慧工厂安全防护",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 17,
    title: "操作疲劳及离岗检测",
    cover: "http://localhost/img/products/操作疲劳及离岗检测-C.jpg",
    category_id: 2,
    description: "智慧工厂人员管理",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 18,
    title: "设备管理",
    cover: "http://localhost/img/products/设备管理-C.png",
    category_id: 2,
    description: "智慧工厂设备监控",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 19,
    title: "产品计数",
    cover: "http://localhost/img/products/产品计数-C.png",
    category_id: 2,
    description: "智慧工厂产能统计",
    create_time: "2025/5/13",
    status: 1
  },
  {
    id: 20,
    title: "后厨标准着装检测",
    cover: "http://localhost/img/products/10983306-1.png",
    category_id: 3,
    description: "明厨亮灶检测能力",
    create_time: "2025/5/13",
    status: 1
  }
]

const productDetails = [
  {
    id: 1,
    title: "知识管理",
    description: "基于生成式大模型和 RAG 构建高效、智能、可管理的分域知识中心，支持多模态数据分类存储与跨模态关联检索。通过 RAG 实现精准知识发现，结合动态更新机制确保知识时效性与完整性。系统支持权限控制与场景化应用，可用于智能问答、知识推荐、会议辅助、文档扩写等，提升企业知识利用率与协作效率。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 2,
    title: "智能客服和虚拟助手",
    description: "基于关键字检索准确率与效率较低，客服人员流动性大、服务水平参差不齐。结合大模型和 RAG 能力，提供高效能、高拟人的人机交互，深入理解客户需求并精准高质量回答咨询，提升转化率与服务质量。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 3,
    title: "视觉辅助判断",
    description: "基于多模态大模型技术底座，通过多模态协同与语义融合实现视觉辅助判断智能化升级。以 \"大模型复审小模型\" 协同机制提升告警准确性，突破传统目标检测限制，融合图像、时序等多源信息，增强场景理解能力，赋能告警复审、通用目标检测、复杂事件监测，为智能安防、工业质检提供高可靠决策支持。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 4,
    title: "数字化信息平台",
    description: "数字化平台是企业数字化转型核心助力，打通生产、研发、设计到服务全业务流程，整合数据，提升运营效率与管理水平，增强企业市场竞争力。依托大数据、人工智能、物联网实现设备互联互通与数据实时采集分析，对仓库、生产线等智能监控；借助区块链保障数据安全可信；利用 VR/AR 创新设计与培训模式。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 5,
    title: "电子地图交互",
    description: "快速构建建筑内部实体地图，并与视频内容实景结合，提供直观类 AR 视频信息。可将摄像机位置叠加在地图并同屏显示视频，摄像机颜色随状态变化；浸入模式下视频半透明叠加，便于查看位置与画面；可监视多层建筑，在不同楼层快速切换。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 6,
    title: "GIS 电子地图建模",
    description: "将空间管理电子化内容与实景地图结合，传递类 AR 直观信息，便于快速判断处置。基于 GIS 地图整合形成园区信息模型，全方位展现基础设施、楼宇、车间等信息，完整呈现园区态势，实现对物理园区的数字化映射。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 7,
    title: "视频质量监测",
    description: "自动化智能化巡检摄像头视频质量，保障视频数据始终处于最优状态。可管理多品牌摄像头，通过实时视频分析侦测摄像机工作状态是否正常，一旦发现异常或故障主动上报并请求处理。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 8,
    title: "视频转换网关",
    description: "在核心视频平台之外，通过智能网关适配特定地区、行业或企业的视频控制及传输标准。支持松耦合可拆装智能网关，适配 GB/T28181 等标准，支持摄像头控制、视频流推送拉取，实现视频平台间互联、传输、交换与控制。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 9,
    title: "视频汇聚管理",
    description: "便捷接入和管理多品牌多型号摄像头，保护现有投资并保持未来灵活性。已整合超 2000 个设备，支持不同厂商 IP 摄像机同时接入，可软件配置设备，兼容私有协议、ONVIF、RTSP、GB/T28181 等标准协议。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 10,
    title: "鼠患检测",
    description: "应用于食堂、餐厅、生产车间，监测指定场所并在发现鼠患时告警，跟踪鼠患位置并生成活动路径为封堵提供依据。自研深度学习算法可在低光照条件下识别老鼠，识别准确率超 95%，能有效杜绝卫生及生产隐患。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 11,
    title: "厂区标准着装检测",
    description: "应用于生产车间、厂区，自动识别进出人员是否佩戴安全帽、是否正确穿着标准样式工作服装，支持微信公众号推送违规穿戴通知、查看抓拍图片，移动端小程序可查看报警历史记录，规范人员管理、保障人身安全。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 12,
    title: "产线跟踪",
    description: "应用于生产车间、存储场景、大型设备等，对特定区域 24 小时监控，自定义限制区域并实时追踪物品状态，通过后台平台、小程序传输物品状态与位置信息，可自定义各类物品，保障物品安全与安全生产。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 13,
    title: "安防检测",
    description: "应用于工作及其他区域，通过视频提取人体骨骼姿态，识别跌倒、平躺、蹲、翻越等异常行为并告警，尽早发现伤害或风险。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 14,
    title: "标准动作识别",
    description: "应用于实验室、关键操作台、培训考试，AI 识别人员操作是否达到关键动作，自动检测手部动作是否符合预先设定的关键标准。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 15,
    title: "违规手机操作检测",
    description: "应用于生产车间、值班室、关键岗位，AI 智能识别指定区域内工作人员是否操作手机，提前发现危险岗位使用手机带来的安全风险。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 16,
    title: "危险动作识别",
    description: "应用于生产车间、危险操作区域，自动分析人员骨骼姿态，识别摔倒、未站在指定位置作业、未使用标准工器具、吊运作业违规、攀爬跨越危险设备等行为并告警，减轻事故发生可能性。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 17,
    title: "操作疲劳及离岗检测",
    description: "应用于值班室、生产监控区域，自动监控值班人员疲劳状态（记录闭眼时间、超时报警），监控工作区域人员在岗情况（离岗超时报警），支持自定义感兴趣区域与时间阈值，保障安全生产。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 18,
    title: "设备管理",
    description: "应用于生产车间、关键设备，跟踪重要设备运行姿态，发现异常时及时预警，报警信息支持移动端通知与大屏显示，可监控设备关键工作状态、及时发现运作异常（如钢厂开卷机点检案例）。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 19,
    title: "产品计数",
    description: "应用于生产车间、存储场景，对特定区域 24 小时监控，自定义限制区域并实时追踪物品数量，通过后台平台、小程序传输数量信息，支持各类物品识别，实时掌握物品数量、保障物品安全。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 20,
    title: "后厨标准着装检测",
    description: "应用于餐饮后厨场景，自动识别工作人员是否规范穿着厨师服、佩戴厨师帽与口罩，保障食品生产卫生安全。",
    create_time: "2026/3/25 0:00",
    update_time: "2026/3/25 0:00",
    status: 1
  }
]

const productMaterials = [
  {
    id: 1,
    product_id: 1,
    material_type: "image",
    file_url: "http://localhost/img/products/知识管理-C.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 2,
    product_id: 2,
    material_type: "image",
    file_url: "http://localhost/img/products/智能客服和虚拟助手-C.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 3,
    product_id: 3,
    material_type: "image",
    file_url: "http://localhost/img/products/视觉辅助判断-C.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 4,
    product_id: 4,
    material_type: "image",
    file_url: "http://localhost/img/products/数字化信息平台-C.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 5,
    product_id: 5,
    material_type: "image",
    file_url: "http://localhost/img/products/10983406.jpg",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 6,
    product_id: 5,
    material_type: "video",
    file_url: "http://localhost/img/products/109999.mp4",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 7,
    product_id: 6,
    material_type: "image",
    file_url: "http://localhost/img/products/10983409.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 8,
    product_id: 6,
    material_type: "image",
    file_url: "http://localhost/img/products/10983408.jpg",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 9,
    product_id: 6,
    material_type: "image",
    file_url: "http://localhost/img/products/10983407.jpg",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 10,
    product_id: 7,
    material_type: "image",
    file_url: "http://localhost/img/products/视频质量监测-C.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 11,
    product_id: 8,
    material_type: "image",
    file_url: "http://localhost/img/products/10983411.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 12,
    product_id: 8,
    material_type: "image",
    file_url: "http://localhost/img/products/10983410.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 13,
    product_id: 9,
    material_type: "image",
    file_url: "http://localhost/img/products/视频汇聚管理-C.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 14,
    product_id: 10,
    material_type: "image",
    file_url: "http://localhost/img/products/鼠患检测-C.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 15,
    product_id: 11,
    material_type: "image",
    file_url: "http://localhost/img/products/标准着装检测-C.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 16,
    product_id: 12,
    material_type: "video",
    file_url: "http://localhost/img/products/12222.mp4",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 17,
    product_id: 13,
    material_type: "image",
    file_url: "http://localhost/img/products/10983353.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 18,
    product_id: 13,
    material_type: "image",
    file_url: "http://localhost/img/products/10983352.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 19,
    product_id: 13,
    material_type: "video",
    file_url: "http://localhost/img/products/1333333.mp4",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 20,
    product_id: 14,
    material_type: "video",
    file_url: "http://localhost/img/products/14.mp4",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 21,
    product_id: 15,
    material_type: "image",
    file_url: "http://localhost/img/products/10983356.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 22,
    product_id: 15,
    material_type: "image",
    file_url: "http://localhost/img/products/10983355.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 23,
    product_id: 16,
    material_type: "image",
    file_url: "http://localhost/img/products/10983351.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 24,
    product_id: 16,
    material_type: "image",
    file_url: "http://localhost/img/products/10983350.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 25,
    product_id: 16,
    material_type: "image",
    file_url: "http://localhost/img/products/10983349.png",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 26,
    product_id: 17,
    material_type: "image",
    file_url: "http://localhost/img/products/10983358.jpg",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 27,
    product_id: 17,
    material_type: "image",
    file_url: "http://localhost/img/products/10983357.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 28,
    product_id: 18,
    material_type: "image",
    file_url: "http://localhost/img/products/10983360.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 29,
    product_id: 18,
    material_type: "image",
    file_url: "http://localhost/img/products/10983359.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 30,
    product_id: 18,
    material_type: "video",
    file_url: "http://localhost/img/products/18.mp4",
    sort: 3,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 31,
    product_id: 19,
    material_type: "image",
    file_url: "http://localhost/img/products/产品计数-C.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 32,
    product_id: 19,
    material_type: "video",
    file_url: "http://localhost/img/products/19.mp4",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 33,
    product_id: 20,
    material_type: "image",
    file_url: "http://localhost/img/products/10983306-1.png",
    sort: 1,
    create_time: "2026/3/25 0:00",
    status: 1
  },
  {
    id: 34,
    product_id: 20,
    material_type: "image",
    file_url: "http://localhost/img/products/10983305-1.png",
    sort: 2,
    create_time: "2026/3/25 0:00",
    status: 1
  }
]

db.data.solutions.categories = solutionCategories
db.data.solutions.list = solutions
db.data.solutions.details = solutionDetails
db.data.solutions.materials = solutionMaterials

db.data.products.categories = productCategories
db.data.products.list = products
db.data.products.details = productDetails
db.data.products.materials = productMaterials

await db.write()

console.log('数据初始化完成！')