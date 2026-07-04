// 语言文件
const messages = {
  'zh-CN': {
    // 导航栏
    home: '首页',
    about: '关于我们',
    solutions: '解决方案',
    products: '产品服务',
    
    // 首页
    sliderSubtitle: 'SMART TECHNOLOGY EMPOWERMENT ENGINE',
    sliderTitle: '智能科技赋能引擎',
    sliderDescription: '人工智能+数字基建，赋能行业创新',
    
    aboutSection: '关于我们',
    aboutDescription: '南京果动智能科技有限公司成立于2019年\n公司在石家庄设立第二研发中心\n专注于将领先的人工智能、物联网和大数据技术赋能传统行业\nAI视觉、大模型、IoT和大数据技术整合应用积累丰富经验\n团队核心成员拥有人工智能、互联网软硬件的丰富经验\n通过对生产和业务流程的人工智能注入，降低企业成本、提升客户感知\n公司坚持自主原创应用，并与技术合作伙伴深度共融',
    
    solutionsSection: '解决方案',
    solutionsDescription: '以人工智能+物联网技术打造 AI CITY, 为政府、企业提供城市管理、安全督查、智慧工厂、智能制造等智慧空间管理一站式解决方案，提供智能化解决方案，涵盖家庭、商业和工业场景。',
    
    solution1Subtitle: 'Gaia Software Platform',
    solution1Title: '智能制造',
    solution1Description: '多技术融合，管理生产空间、跟踪生产过程、检测产品缺陷，优化业务流程，提升企业效益。',
    
    solution2Subtitle: 'Gaia Custom Solutions',
    solution2Title: '食品行业解决方案',
    solution2Description: '按需定制、远程监管，保障生产及用餐各环节安全与管理',
    
    solution3Subtitle: 'SMART HARDWARE DEV',
    solution3Title: '交通解决方案',
    solution3Description: '融合视频管理与 AI 技术，全时段多维监控交通场景，处理异常，提升管理效率与安全水平',
    
    solution4Subtitle: 'Gaia Smart Home',
    solution4Title: '机场安防解决方案',
    solution4Description: '秉持 "巨量、融智、场景" 理念，构建平台、地图、天网体系，提升机场安防管理，及快速调度能力',
    
    solution5Title: '了解详情',
    solution5Description: '获取详细内容，了解更多我们的服务',
    
    productsSection: '产品与服务',
    productsDescription: '以人工智能+数字基建技术打造智能生活，为家庭、商业和工业提供智能化解决方案，提升用户体验。',
    
    product1Title: '智慧空间管理',
    product1Description: '借助AI技术，在多场所实现设备、人员、物品状态监测与异常预警，助力区域安全，提升企业效率',
    
    product2Title: '视频管理平台',
    product2Description: '整合多品牌摄像头，适配多种标准，巡检视频质量，结合地图提供直观可视化信息',
    
    product3Title: '数字化信息平台',
    product3Description: '依托多技术融合，实现设备互联与数据采集分析，助力企业数字化转型，提升运营与管理水平',
    
    product4Title: '大模型',
    product4Description: '基于多模态技术，在视觉判断、客服交互、知识管理等场景提供智能高效支持',
    
    product5Title: '企业定制化解决方案',
    product5Description: '根据客户企业的需求和自身特点，定制个性化解决方案。与企业原有管理和技术体系无缝融合，平滑提升企业效益。',
    
    productMore: '更多 >>>',
    
    beianCode: '',
    copyright: '版权所有© 南京果动智能科技有限公司 人工智能·科技赋能',
    
    // 关于我们页面
    aboutPageTitle: '公司简介',
    aboutPageDescription: '南京果动智能科技有限公司是一家专注于智能科技领域的公司，成立于2019年，位于江苏省南京市。公司致力于提供智能化解决方案，涵盖智能制造、智慧交通、智慧园区应用等多个领域。其核心团队由具备丰富行业经验的技术专家组成，注重技术研发与创新',
    
    aboutFeature1: '公司积累深厚的AI视觉及智能空间管理项目实施经验，形成完备的项目交付体系，为各类类型项目提供标准化、定制化的解决方案。凭借与先进AI领域企业的战略合作机制，积极开展国际化市场布局，在全球范围内实现业务的稳健拓展与品牌影响力的持续提升。',
    
    aboutFeature2: '公司掌握AI工业检测领域前沿技术，以全球领先的技术研发成果构建行业技术壁垒，同时储备先进的AI模型研发能力，在工业级技术领域形成显著的技术领先优势与核心竞争力。',
    
    aboutFeature3: '依托顶尖院校的科研资源协同，整合优质企业合作生态，构建专业化研发与实施团队。团队在AI、大模型、大数据、物联网等技术领域拥有深厚的技术实力、高效的项目交付能力与突出的成本控制优势，构建起企业可持续发展的核心支撑体系。',
    
    aboutPartners: '客户及合作伙伴',
    
    aboutContact: '联系我们',
    aboutAddress: '地址：江苏省南京市鼓楼区集庆门大街 268 号',
    aboutPhone: '电话：(86) 189-5167-8898',
    aboutEmail: '邮箱：marketing@gdi-tech.com',
    
    // 解决方案页面
    solutionsPageTitle: '解决方案',
    solutionsBreadcrumb: '解决方案',
    
    solutionCategory1: '智能制造',
    solutionCategory1Item1: '缺陷检测',
    solutionCategory1Item2: '产品缺陷检测及追溯',
    solutionCategory1Item3: '智慧工厂管理',
    
    solutionCategory2: '食品',
    solutionCategory2Item1: '智慧餐厅',
    solutionCategory2Item2: '生产及生产安全合规',
    
    solutionCategory3: '交通',
    solutionCategory3Item1: '智慧交通',
    solutionCategory3Item2: '加油/充电站人车识别',
    
    solutionCategory4: '园区',
    solutionCategory4Item1: '智慧园区',
    solutionCategory4Item2: '远程多园区安防集中管理',
    solutionCategory4Item3: '智慧社区',
    
    solutionCategory5: '机场',
    solutionCategory5Item1: '旅客捷运',
    solutionCategory5Item2: '仓库管理',
    solutionCategory5Item3: '物流分拣',
    solutionCategory5Item4: '营业大厅',
    solutionCategory5Item5: '医院与实验室',
    solutionCategory5Item6: '科研与临床无接触协作',
    solutionCategory5Item7: '全流程智能化诊断支持',
    
    solutionItem1: '科研与临床无接触协作',
    solutionItem2: '全流程智能化诊断支持',
    solutionItem3: '智慧营业厅',
    solutionItem4: '仓库管理',
    solutionItem5: '物流分拣',
    solutionItem6: '安防控制平台',
    solutionItem7: '智慧食堂',
    solutionItem8: '远程多园区安防集中管理',
    solutionItem9: '智慧园区',
    
    paginationPrev: '上一页',
    paginationNext: '下一页',
    
    // 产品服务页面
    productsPageTitle: '产品服务',
    productsBreadcrumb: '产品服务',
    
    productCategory1: '智慧空间管理',
    productCategory2: '智慧工厂',
    productCategory3: '视频系统',
    productCategory4: '视频管理平台',
    productCategory5: '视频汇聚管理',
    productCategory6: '视频转码网关',
    productCategory7: '视频质量监测',
    productCategory8: 'GIS电子地图建模',
    productCategory9: '电子地图交互',
    productCategory10: '数字化信息平台',
    productCategory11: '大模型',
    productCategory12: '智能客服和虚拟助手',
    productCategory13: '视觉辅助判断',
    productCategory14: '知识管理',
    
    productItem1: '知识管理',
    productItem2: '智能客服和虚拟助手',
    productItem3: '视觉辅助判断',
    productItem4: '数字化信息平台',
    productItem5: '电子地图交互',
    productItem6: 'GIS电子地图建模',
    productItem7: '视频质量监测',
    productItem8: '视频转码网关',
    productItem9: '视频汇聚管理',

    loading: '加载中...',
    footerCopyrightLeft: '版权所有© 南京果动智能科技有限公司',
    footerCopyrightRight: '人工智能·科技赋能',
    aboutOfficeImageAlt: '办公环境',
    aboutPartnersImageAlt: '客户及合作伙伴',
    aboutPartnersSubtitle: '客户与合作伙伴',
    contactWelcomeTitle: '欢迎与我们联系',
    contactWelcomeSubtitle: '我们期待与您的合作。',
    contactCompanyNameDisplay: '南京果动智能科技有限公司',
    contactAddressGulou: '江苏省南京市鼓楼区集庆门大街268号',
    contactPhoneDisplay: '(86) 189-5167-8898',
    contactEmailDisplay: 'marketing@gdi-tech.com',
    mapMarkerTitle: '南京果动智能科技有限公司',
    mapLineAddress: '地址：江苏省南京市鼓楼区集庆门大街268号',
    mapLinePhone: '电话：(86) 189-5167-8898',
    mapLineEmail: '邮箱：marketing@gdi-tech.com',
    categoryAll: '全部',
    solutionDetailNoDescription: '暂无解决方案描述',
    productDetailNoDescription: '暂无产品描述',
    download: '下载',
    materialTypeImage: '图片',
    materialTypeVideo: '视频',
    materialTypeDocument: '文档',
    materialTypeOther: '其他',
    mediaVideo: '视频',
  },
  
  'en-US': {
    // 导航栏
    home: 'Home',
    about: 'About Us',
    solutions: 'Solutions',
    products: 'Products\u00A0&\u00A0Services',
    
    // 首页
    sliderSubtitle: 'SMART TECHNOLOGY EMPOWERMENT ENGINE',
    sliderTitle: 'Smart Technology Empowerment Engine',
    sliderDescription: 'Artificial Intelligence + Digital Infrastructure, Empowering Industry Innovation',
    
    aboutSection: 'About Us',
    aboutDescription: 'GDIINTELLIGENCE PTE. LTD. was established in 2019\nThe company has established a second R&D center in Shijiazhuang\nFocused on empowering traditional industries with leading artificial intelligence, Internet of Things, and big data technologies\nRich experience in integrating AI vision, large models, IoT, and big data technologies\nCore team members have rich experience in artificial intelligence, Internet software and hardware\nThrough AI injection into production and business processes, reduce enterprise costs and improve customer perception\nThe company insists on independent original applications and deep integration with technology partners',
    
    solutionsSection: 'Solutions',
    solutionsDescription: 'Building AI CITY with artificial intelligence + IoT technology, providing one-stop smart space management solutions for governments and enterprises, including urban management, safety supervision, smart factories, smart manufacturing, and other smart space management solutions, covering home, commercial and industrial scenarios.',
    
    solution1Subtitle: 'Gaia Software Platform',
    solution1Title: 'Smart Manufacturing',
    solution1Description: 'Multi-technology integration, managing production space, tracking production processes, detecting product defects, optimizing business processes, and improving enterprise efficiency.',
    
    solution2Subtitle: 'Gaia Custom Solutions',
    solution2Title: 'Food Industry Solutions',
    solution2Description: 'Customized on demand, remote supervision, ensuring safety and management of all links in production and dining',
    
    solution3Subtitle: 'SMART HARDWARE DEV',
    solution3Title: 'Transportation Solutions',
    solution3Description: 'Integrating video management and AI technology, providing full-time multi-dimensional monitoring of traffic scenarios, handling anomalies, and improving management efficiency and safety levels',
    
    solution4Subtitle: 'Gaia Smart Home',
    solution4Title: 'Airport Security Solutions',
    solution4Description: 'Adhering to the concept of "massive, intelligent integration, scene", building platform, map, and skynet systems to improve airport security management and rapid dispatching capabilities',
    
    solution5Title: 'Learn More',
    solution5Description: 'Get detailed content and learn more about our services',
    
    productsSection: 'Products\u00A0&\u00A0Services',
    productsDescription: 'Building smart life with artificial intelligence + digital infrastructure technology, providing intelligent solutions for home, commercial and industrial scenarios, and improving user experience.',
    
    product1Title: 'Smart Space Management',
    product1Description: 'With AI technology, realize equipment, personnel, and item status monitoring and anomaly warning in multiple places, helping regional safety and improving enterprise efficiency',
    
    product2Title: 'Video Management Platform',
    product2Description: 'Integrate multi-brand cameras, adapt to multiple standards, inspect video quality, and provide intuitive visual information in combination with maps',
    
    product3Title: 'Digital Information Platform',
    product3Description: 'Relying on multi-technology integration, realize equipment interconnection and data collection and analysis, help enterprises digital transformation, and improve operation and management levels',
    
    product4Title: 'Large Models',
    product4Description: 'Based on multi-modal technology, provide intelligent and efficient support in scenarios such as visual judgment, customer service interaction, and knowledge management',
    
    product5Title: 'Enterprise Customized Solutions',
    product5Description: 'Customize personalized solutions according to customer enterprise needs and their own characteristics. Seamlessly integrate with the enterprise\'s original management and technology systems to smoothly improve enterprise benefits.',
    
    productMore: 'More >>>',
    
    copyright: 'Copyright © GDIINTELLIGENCE PTE. LTD.',
    
    // 关于我们页面
    aboutPageTitle: 'Company Profile',
    aboutPageDescription: 'GDIINTELLIGENCE PTE. LTD. was established in 2019. The company has established a second R&D center in Shijiazhuang, focusing on empowering traditional industries with leading artificial intelligence, Internet of Things, and big data technologies.',
    
    aboutFeature1: 'The company has accumulated rich experience in AI vision and smart space management project implementation, forming a complete project delivery system, providing standardized and customized solutions for various types of projects. Relying on strategic cooperation mechanisms with advanced AI field enterprises, it actively carries out international market layout, achieving steady business expansion and continuous improvement of brand influence worldwide.',
    
    aboutFeature2: 'The company masters cutting-edge technologies in the field of AI industrial inspection, builds industry technical barriers with globally leading technology R&D results, and reserves advanced AI model R&D capabilities, forming significant technical leading advantages and core competitiveness in the field of industrial-grade technology.',
    
    aboutFeature3: 'Relying on the scientific research resources of top universities, integrating high-quality enterprise cooperation ecology, and building a professional R&D and implementation team. The team has profound technical strength, efficient project delivery capabilities, and outstanding cost control advantages in AI, large models, big data, Internet of Things and other technical fields, building a core support system for the sustainable development of enterprises.',
    
    aboutPartners: 'Customers and Partners',
    
    aboutContact: 'Contact Us',
    aboutAddress: 'Address: No. 268 Jiqingmen Avenue, Gulou District, Nanjing, Jiangsu Province',
    aboutPhone: 'Phone: (86) 189-5167-8898',
    aboutEmail: 'Email: marketing@gdi-tech.com',
    
    // 解决方案页面
    solutionsPageTitle: 'Solutions',
    solutionsBreadcrumb: 'Solutions',
    
    solutionCategory1: 'Smart Manufacturing',
    solutionCategory1Item1: 'Defect Detection',
    solutionCategory1Item2: 'Product Defect Detection and Traceability',
    solutionCategory1Item3: 'Smart Factory Management',
    
    solutionCategory2: 'Food',
    solutionCategory2Item1: 'Smart Restaurant',
    solutionCategory2Item2: 'Production and Production Safety Compliance',
    
    solutionCategory3: 'Transportation',
    solutionCategory3Item1: 'Smart Transportation',
    solutionCategory3Item2: 'Gas/Charging Station Vehicle and Personnel Identification',
    
    solutionCategory4: 'Park',
    solutionCategory4Item1: 'Smart Park',
    solutionCategory4Item2: 'Remote Multi-Park Security Centralized Management',
    solutionCategory4Item3: 'Smart Community',
    
    solutionCategory5: 'Airport',
    solutionCategory5Item1: 'Passenger捷运',
    solutionCategory5Item2: 'Warehouse Management',
    solutionCategory5Item3: 'Logistics Sorting',
    solutionCategory5Item4: 'Business Hall',
    solutionCategory5Item5: 'Hospitals and Laboratories',
    solutionCategory5Item6: 'Scientific Research and Clinical Contactless Collaboration',
    solutionCategory5Item7: 'Full-process Intelligent Diagnosis Support',
    
    solutionItem1: 'Scientific Research and Clinical Contactless Collaboration',
    solutionItem2: 'Full-process Intelligent Diagnosis Support',
    solutionItem3: 'Smart Business Hall',
    solutionItem4: 'Warehouse Management',
    solutionItem5: 'Logistics Sorting',
    solutionItem6: 'Security Control Platform',
    solutionItem7: 'Smart Canteen',
    solutionItem8: 'Remote Multi-Park Security Centralized Management',
    solutionItem9: 'Smart Park',
    
    paginationPrev: 'Previous Page',
    paginationNext: 'Next Page',
    
    // 产品服务页面
    productsPageTitle: 'Products\u00A0&\u00A0Services',
    productsBreadcrumb: 'Products\u00A0&\u00A0Services',
    
    productCategory1: 'Smart Space Management',
    productCategory2: 'Smart Factory',
    productCategory3: 'Video System',
    productCategory4: 'Video Management Platform',
    productCategory5: 'Video Convergence Management',
    productCategory6: 'Video Transcoding Gateway',
    productCategory7: 'Video Quality Monitoring',
    productCategory8: 'GIS Electronic Map Modeling',
    productCategory9: 'Electronic Map Interaction',
    productCategory10: 'Digital Information Platform',
    productCategory11: 'Large Models',
    productCategory12: 'Intelligent Customer Service and Virtual Assistant',
    productCategory13: 'Visual Auxiliary Judgment',
    productCategory14: 'Knowledge Management',
    
    productItem1: 'Knowledge Management',
    productItem2: 'Intelligent Customer Service and Virtual Assistant',
    productItem3: 'Visual Auxiliary Judgment',
    productItem4: 'Digital Information Platform',
    productItem5: 'Electronic Map Interaction',
    productItem6: 'GIS Electronic Map Modeling',
    productItem7: 'Video Quality Monitoring',
    productItem8: 'Video Transcoding Gateway',
    productItem9: 'Video Convergence Management',

    loading: 'Loading...',
    footerCopyrightLeft: 'Copyright © GDIINTELLIGENCE PTE. LTD.',
    footerCopyrightRight: 'AI · Technology Empowerment',
    aboutOfficeImageAlt: 'Office environment',
    aboutPartnersImageAlt: 'Customers and partners',
    aboutPartnersSubtitle: 'Customers & Partners',
    contactWelcomeTitle: 'Get in touch',
    contactWelcomeSubtitle: 'We look forward to working with you.',
    contactCompanyNameDisplay: 'GDIINTELLIGENCE PTE. LTD.',
    contactAddressGulou: 'No. 268 Jiqingmen Avenue, Gulou District, Nanjing, Jiangsu Province',
    contactPhoneDisplay: '(86) 189-5167-8898',
    contactEmailDisplay: 'marketing@gdi-tech.com',
    mapMarkerTitle: 'GDIINTELLIGENCE PTE. LTD.',
    mapLineAddress: 'Address: No. 268 Jiqingmen Avenue, Gulou District, Nanjing, Jiangsu Province',
    mapLinePhone: 'Tel: (86) 189-5167-8898',
    mapLineEmail: 'Email: marketing@gdi-tech.com',
    categoryAll: 'All',
    solutionDetailNoDescription: 'No solution description available.',
    productDetailNoDescription: 'No product description available.',
    download: 'Download',
    materialTypeImage: 'Image',
    materialTypeVideo: 'Video',
    materialTypeDocument: 'Document',
    materialTypeOther: 'Other',
    mediaVideo: 'Video',
  },
  
  'ja-JP': {
    // 导航栏
    home: 'ホーム',
    about: '会社概要',
    solutions: 'ソリューション',
    products: '製品・サービス',
    
    // 首页
    sliderSubtitle: 'スマートテクノロジーエンパワーメントエンジン',
    sliderTitle: 'スマートテクノロジーエンパワーメントエンジン',
    sliderDescription: '人工知能＋デジタル基盤、産業革新を後押し',
    
    aboutSection: '会社概要',
    aboutDescription: '南京ガイアインテリジェントテクノロジー株式会社は2019年に設立されました\n会社は石家荘に第2の研究開発センターを設立\n先進的な人工知能、IoT、ビッグデータ技術を活用して伝統的産業を支援することに注力\nAIビジョン、大規模モデル、IoT、ビッグデータ技術の統合アプリケーションに豊富な経験を持つ\nチームの中核メンバーは人工知能、インターネットソフトウェア・ハードウェアの豊富な経験を持つ\n生産・業務プロセスへの人工知能の注入を通じて、企業コストを削減し、顧客満足度を向上\n会社は自主的なオリジナルアプリケーションを坚持し、技術パートナーとの深い融合を図る',
    
    solutionsSection: 'ソリューション',
    solutionsDescription: '人工知能＋IoT技術でAI CITYを構築、政府・企業に都市管理、安全監督、スマートファクトリー、スマート製造などのスマート空間管理ワンストップソリューションを提供し、家庭、商業、産業のシナリオをカバーするスマートソリューションを提供。',
    
    solution1Subtitle: 'ガイアソフトウェアプラットフォーム',
    solution1Title: 'スマート製造',
    solution1Description: 'マルチテクノロジー統合、生産空間の管理、生産プロセスの追跡、製品欠陥の検出、ビジネスプロセスの最適化、企業効率の向上。',
    
    solution2Subtitle: 'ガイアカスタムソリューション',
    solution2Title: '食品産業ソリューション',
    solution2Description: 'ニーズに応じたカスタマイズ、遠隔監督、生産・食事の各段階の安全と管理を保障',
    
    solution3Subtitle: 'スマートハードウェア開発',
    solution3Title: '交通ソリューション',
    solution3Description: 'ビデオ管理とAI技術を融合し、交通シーンの全時間帯・多次元モニタリング、異常処理、管理効率と安全レベルの向上',
    
    solution4Subtitle: 'ガイアスマートホーム',
    solution4Title: '空港セキュリティソリューション',
    solution4Description: '「巨量、融智、シーン」の理念を堅持し、プラットフォーム、地図、天網システムを構築し、空港セキュリティ管理と迅速な派遣能力を向上',
    
    solution5Title: '詳細を了解',
    solution5Description: '詳細なコンテンツを取得し、当社のサービスについてさらに詳しく知る',
    
    productsSection: '製品・サービス',
    productsDescription: '人工知能＋デジタル基盤技術でスマートライフを構築、家庭、商業、産業にスマートソリューションを提供し、ユーザーエクスペリエンスを向上。',
    
    product1Title: 'スマート空間管理',
    product1Description: 'AI技術を活用し、複数の場所で機器、人員、物品の状態モニタリングと異常予知を実現し、地域安全を支援し、企業効率を向上',
    
    product2Title: 'ビデオ管理プラットフォーム',
    product2Description: 'マルチブランドカメラを統合し、複数の標準に対応し、ビデオ品質を検査し、地図と組み合わせて直感的な視覚情報を提供',
    
    product3Title: 'デジタル情報プラットフォーム',
    product3Description: 'マルチテクノロジー融合に依拠し、機器の相互接続とデータ収集・分析を実現し、企業のデジタル変革を支援し、運営・管理レベルを向上',
    
    product4Title: '大規模モデル',
    product4Description: 'マルチモーダル技術に基づき、視覚判断、カスタマーサービスインタラクション、知識管理などのシナリオでインテリジェントかつ効率的なサポートを提供',
    
    product5Title: '企業カスタマイズソリューション',
    product5Description: '顧客企業のニーズと自身の特性に応じて、パーソナライズされたソリューションをカスタマイズ。企業の既存の管理・技術システムとシームレスに統合し、企業のメリットを円滑に向上。',
    
    productMore: '詳細 >>>',
    
    copyright: '©南京ガイアインテリジェントテクノロジー株式会社',
    
    // 关于我们页面
    aboutPageTitle: '会社概要',
    aboutPageDescription: '南京ガイアインテリジェントテクノロジー株式会社は2019年に設立されました。会社は石家荘に第2の研究開発センターを設立し、先進的な人工知能、IoT、ビッグデータ技術を活用して伝統的産業を支援することに注力しています。',
    
    aboutFeature1: '同社はAIビジョンとスマート空間管理プロジェクトの実装に豊富な経験を積み、包括的なプロジェクト納品システムを形成し、様々なタイプのプロジェクトに標準化されたカスタマイズソリューションを提供しています。先進的なAI分野の企業との戦略的協力メカニズムに依拠して、国際市場のレイアウトを積極的に展開し、世界中で事業の着実な拡大とブランド影响力の継続的な向上を実現しています。',
    
    aboutFeature2: '同社はAI産業検査分野の最先端技術を掌握し、世界をリードする技術研究開発成果で産業技術障壁を構築するとともに、先進的なAIモデル研究開発能力を確保し、産業グレード技術分野で顕著な技術的優位性と中核競争力を形成しています。',
    
    aboutFeature3: 'トップ大学の研究資源に依拠し、高品質な企業協力エコロジーを統合し、専門的な研究開発・実装チームを構築しています。チームはAI、大規模モデル、ビッグデータ、IoTなどの技術分野で深い技術力、効率的なプロジェクト納品能力、優れたコスト管理優位性を持ち、企業の持続的発展のための中核サポートシステムを構築しています。',
    
    aboutPartners: '顧客及びパートナー',
    
    aboutContact: 'お問い合わせ',
    aboutAddress: '住所：江蘇省南京市鼓楼区集慶門大街268号',
    aboutPhone: '電話：(86) 189-5167-8898',
    aboutEmail: 'メール：marketing@gdi-tech.com',
    
    // 解决方案页面
    solutionsPageTitle: 'ソリューション',
    solutionsBreadcrumb: 'ソリューション',
    
    solutionCategory1: 'スマート製造',
    solutionCategory1Item1: '欠陥検出',
    solutionCategory1Item2: '製品欠陥検出・トレーサビリティ',
    solutionCategory1Item3: 'スマートファクトリー管理',
    
    solutionCategory2: '食品',
    solutionCategory2Item1: 'スマートレストラン',
    solutionCategory2Item2: '生産・生産安全コンプライアンス',
    
    solutionCategory3: '交通',
    solutionCategory3Item1: 'スマート交通',
    solutionCategory3Item2: 'ガソリンスタンド/充電ステーションの人車識別',
    
    solutionCategory4: 'パーク',
    solutionCategory4Item1: 'スマートパーク',
    solutionCategory4Item2: 'リモートマルチパークセキュリティ集中管理',
    solutionCategory4Item3: 'スマートコミュニティ',
    
    solutionCategory5: '空港',
    solutionCategory5Item1: '旅客捷運',
    solutionCategory5Item2: '倉庫管理',
    solutionCategory5Item3: '物流仕分け',
    solutionCategory5Item4: '営業ホール',
    solutionCategory5Item5: '病院・研究所',
    solutionCategory5Item6: '研究・臨床非接触コラボレーション',
    solutionCategory5Item7: '全行程知能診断サポート',
    
    solutionItem1: '研究・臨床非接触コラボレーション',
    solutionItem2: '全行程知能診断サポート',
    solutionItem3: 'スマート営業ホール',
    solutionItem4: '倉庫管理',
    solutionItem5: '物流仕分け',
    solutionItem6: 'セキュリティ制御プラットフォーム',
    solutionItem7: 'スマート食堂',
    solutionItem8: 'リモートマルチパークセキュリティ集中管理',
    solutionItem9: 'スマートパーク',
    
    paginationPrev: '前のページ',
    paginationNext: '次のページ',
    
    // 产品服务页面
    productsPageTitle: '製品・サービス',
    productsBreadcrumb: '製品・サービス',
    
    productCategory1: 'スマート空間管理',
    productCategory2: 'スマートファクトリー',
    productCategory3: 'ビデオシステム',
    productCategory4: 'ビデオ管理プラットフォーム',
    productCategory5: 'ビデオ収束管理',
    productCategory6: 'ビデオトランスコーディングゲートウェイ',
    productCategory7: 'ビデオ品質監視',
    productCategory8: 'GIS電子地図モデリング',
    productCategory9: '電子地図インタラクション',
    productCategory10: 'デジタル情報プラットフォーム',
    productCategory11: '大規模モデル',
    productCategory12: 'インテリジェントカスタマーサービスと仮想アシスタント',
    productCategory13: '視覚補助判断',
    productCategory14: '知識管理',
    
    productItem1: '知識管理',
    productItem2: 'インテリジェントカスタマーサービスと仮想アシスタント',
    productItem3: '視覚補助判断',
    productItem4: 'デジタル情報プラットフォーム',
    productItem5: '電子地図インタラクション',
    productItem6: 'GIS電子地図モデリング',
    productItem7: 'ビデオ品質監視',
    productItem8: 'ビデオトランスコーディングゲートウェイ',
    productItem9: 'ビデオ収束管理',

    loading: '読み込み中...',
    footerCopyrightLeft: '©南京ガイアインテリジェントテクノロジー株式会社',
    footerCopyrightRight: '人工知能・技術赋能',
    aboutOfficeImageAlt: 'オフィス環境',
    aboutPartnersImageAlt: '顧客およびパートナー',
    aboutPartnersSubtitle: '顧客とパートナー',
    contactWelcomeTitle: 'お問い合わせ',
    contactWelcomeSubtitle: 'ご協力をお待ちしております。',
    contactCompanyNameDisplay: '南京ガイアインテリジェントテクノロジー株式会社',
    contactAddressGulou: '江蘇省南京市鼓楼区集慶門大街268号',
    contactPhoneDisplay: '(86) 189-5167-8898',
    contactEmailDisplay: 'marketing@gdi-tech.com',
    mapMarkerTitle: '南京ガイアインテリジェントテクノロジー株式会社',
    mapLineAddress: '住所：江蘇省南京市鼓楼区集慶門大街268号',
    mapLinePhone: '電話：(86) 189-5167-8898',
    mapLineEmail: 'メール：marketing@gdi-tech.com',
    categoryAll: 'すべて',
    solutionDetailNoDescription: 'ソリューションの説明はありません。',
    productDetailNoDescription: '製品の説明はありません。',
    download: 'ダウンロード',
    materialTypeImage: '画像',
    materialTypeVideo: '動画',
    materialTypeDocument: 'ドキュメント',
    materialTypeOther: 'その他',
    mediaVideo: '動画',
  }
}

export default messages;