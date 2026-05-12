-- 数据库初始化脚本

-- 解决方案分类表
CREATE TABLE IF NOT EXISTS solution_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    parent_id INT DEFAULT NULL,
    description TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1
);

-- 解决方案列表
CREATE TABLE IF NOT EXISTS solutions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    cover VARCHAR(255),
    category_id INT,
    description TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES solution_categories(id)
);

-- 解决方案详情
CREATE TABLE IF NOT EXISTS solution_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1
);

-- 解决方案素材
CREATE TABLE IF NOT EXISTS solution_materials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    solution_id INT,
    material_type VARCHAR(50),
    file_url VARCHAR(255),
    sort INT DEFAULT 0,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1,
    FOREIGN KEY (solution_id) REFERENCES solutions(id)
);

-- 产品服务分类
CREATE TABLE IF NOT EXISTS product_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    parent_id INT DEFAULT NULL,
    description TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1
);

-- 产品服务列表
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    cover VARCHAR(255),
    category_id INT,
    description TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES product_categories(id)
);

-- 产品服务详情
CREATE TABLE IF NOT EXISTS product_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1
);

-- 产品服务素材
CREATE TABLE IF NOT EXISTS product_materials (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    material_type VARCHAR(50),
    file_url VARCHAR(255),
    sort INT DEFAULT 0,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 插入示例数据

-- 解决方案分类
INSERT INTO solution_categories (name, parent_id, description) VALUES
('智能制造', NULL, '智能制造解决方案'),
('食品', NULL, '食品行业解决方案'),
('智慧工厂', 1, '智慧工厂解决方案');

-- 解决方案列表
INSERT INTO solutions (title, cover, category_id, description) VALUES
('缺陷检测', 'http://localhost/img/solutions/缺陷检测-C.png', 1, '产品缺陷自动检测解决方案'),
('产线智能化跟踪及检测', 'http://localhost/img/solutions/产线智能化跟踪及检测-C.png', 1, '产线智能化跟踪及检测解决方案'),
('智慧餐厅', 'http://localhost/img/solutions/智慧餐厅-C.png', 2, '智慧餐厅解决方案');

-- 解决方案详情
INSERT INTO solution_details (title, description) VALUES
('缺陷检测', '缺陷检测解决方案详情'),
('产线智能化跟踪及检测', '产线智能化跟踪及检测解决方案详情'),
('智慧餐厅', '智慧餐厅解决方案详情');

-- 解决方案素材
INSERT INTO solution_materials (solution_id, material_type, file_url, sort) VALUES
(1, 'image', 'http://localhost/img/solutions/缺陷检测-1.png', 1),
(1, 'video', 'http://localhost/video/solutions/缺陷检测.mp4', 2),
(2, 'image', 'http://localhost/img/solutions/产线智能化-1.png', 1);

-- 产品服务分类
INSERT INTO product_categories (name, parent_id, description) VALUES
('智慧空间管理', NULL, '智慧空间管理产品'),
('视频管理平台', NULL, '视频管理平台产品'),
('智慧工厂', 1, '智慧工厂产品');

-- 产品服务列表
INSERT INTO products (title, cover, category_id, description) VALUES
('智慧工厂', 'http://localhost/img/products/智慧工厂-C.png', 3, '智慧工厂产品'),
('明厨亮灶', 'http://localhost/img/products/明厨亮灶-C.png', 1, '明厨亮灶产品'),
('视频汇聚管理', 'http://localhost/img/products/视频汇聚管理-C.png', 2, '视频汇聚管理产品');

-- 产品服务详情
INSERT INTO product_details (title, description) VALUES
('智慧工厂', '智慧工厂产品详情'),
('明厨亮灶', '明厨亮灶产品详情'),
('视频汇聚管理', '视频汇聚管理产品详情');

-- 产品服务素材
INSERT INTO product_materials (product_id, material_type, file_url, sort) VALUES
(1, 'image', 'http://localhost/img/products/智慧工厂-1.png', 1),
(1, 'video', 'http://localhost/video/products/智慧工厂.mp4', 2),
(2, 'image', 'http://localhost/img/products/明厨亮灶-1.png', 1);
