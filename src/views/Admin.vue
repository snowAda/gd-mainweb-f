<script setup>import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const isLoggedIn = ref(false);
const adminInfo = ref(null);
// 当前选中的标签页
const activeTab = ref('products');
const activeSubTab = ref('list'); // 'list', 'categories'
// 搜索关键词
const searchKeyword = ref('');
// 产品数据
const products = ref([]);
const productTotal = ref(0);
const productCategories = ref([]);
// 解决方案数据
const solutions = ref([]);
const solutionTotal = ref(0);
const solutionCategories = ref([]);
// 当前编辑的详情
const currentDetail = ref(null);
// 分页数据
const currentPage = ref(1);
const pageSize = ref(9);
const totalPages = ref(1);
// 上传相关
const isUploading = ref(false);
const uploadInputRef = ref(null);
const materialUploadRef = ref(null);
// 表单数据
const formData = ref({
 title: '',
 cover: '',
 category_id: '',
 description: ''
});
const categoryForm = ref({
 name: '',
 parent_id: 0,
 description: ''
});
const detailForm = ref({
 title: '',
 description: ''
});
// 素材数据
const materials = ref([]);
const materialForm = ref({
 material_type: 'image',
 file_url: '',
 sort: 1
});
// 模态框状态
const showModal = ref(false);
const showCategoryModal = ref(false);
const showDetailModal = ref(false);
const showMaterialModal = ref(false);
const modalType = ref('add'); // 'add' or 'edit'
const currentItem = ref(null);
const handleLogout = () => {
 localStorage.removeItem('adminToken');
 router.push('/admin/login');
};
const fetchAdminInfo = async () => {
 try {
 const response = await fetch('/api/admin/info', {
 headers: {
 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
 }
 });
 if (response.status === 401) {
 router.push('/admin/login');
 return;
 }
 const result = await response.json();
 if (result.success) {
 isLoggedIn.value = true;
 adminInfo.value = result.data;
 }
 }
 catch (error) {
 router.push('/admin/login');
 }
};
const fetchProducts = async () => {
 try {
 const url = searchKeyword.value
 ? `/api/products?search=${encodeURIComponent(searchKeyword.value)}&page=${currentPage.value}&pageSize=${pageSize.value}&locale=zh-CN`
 : `/api/products?page=${currentPage.value}&pageSize=${pageSize.value}&locale=zh-CN`;
 const response = await fetch(url);
 const result = await response.json();
 if (result && result.products) {
 products.value = result.products;
 productTotal.value = result.pagination?.total || 0;
 totalPages.value = result.pagination?.totalPages || 1;
 }
 }
 catch (error) {
 console.error('获取产品列表失败:', error);
 }
};
const fetchSolutions = async () => {
 try {
 const url = searchKeyword.value
 ? `/api/solutions?search=${encodeURIComponent(searchKeyword.value)}&page=${currentPage.value}&pageSize=${pageSize.value}&locale=zh-CN`
 : `/api/solutions?page=${currentPage.value}&pageSize=${pageSize.value}&locale=zh-CN`;
 const response = await fetch(url);
 const result = await response.json();
 if (result && result.solutions) {
 solutions.value = result.solutions;
 solutionTotal.value = result.pagination?.total || 0;
 totalPages.value = result.pagination?.totalPages || 1;
 }
 }
 catch (error) {
 console.error('获取解决方案列表失败:', error);
 }
};
const fetchCategories = async () => {
 try {
 const [productCatRes, solutionCatRes] = await Promise.all([
 fetch('/api/products/categories?locale=zh-CN'),
 fetch('/api/solutions/categories?locale=zh-CN')
 ]);
 const productCats = await productCatRes.json();
 const solutionCats = await solutionCatRes.json();
 productCategories.value = productCats;
 solutionCategories.value = solutionCats;
 }
 catch (error) {
 console.error('获取分类列表失败:', error);
 }
};
const fetchMaterials = async (itemId, type) => {
 try {
 const url = type === 'product'
 ? `/api/products/${itemId}/materials`
 : `/api/solutions/${itemId}/materials`;
 const response = await fetch(url);
 materials.value = await response.json();
 }
 catch (error) {
 console.error('获取素材列表失败:', error);
 }
};
const getCategoryName = (categoryId, type) => {
 const categories = type === 'products' ? productCategories.value : solutionCategories.value;
 const category = categories.find(cat => cat.id === categoryId);
 return category ? category.name : '未知分类';
};
const getParentCategoryName = (parentId, type) => {
 const categories = type === 'products' ? productCategories.value : solutionCategories.value;
 const category = categories.find(cat => cat.id === parentId);
 return category ? category.name : '顶级分类';
};
const openAddModal = () => {
 modalType.value = 'add';
 currentItem.value = null;
 formData.value = {
 title: '',
 cover: '',
 category_id: '',
 description: ''
 };
 showModal.value = true;
};
const openEditModal = (item) => {
 modalType.value = 'edit';
 currentItem.value = item;
 formData.value = {
 title: item.title,
 cover: item.cover,
 category_id: item.category_id,
 description: item.description
 };
 showModal.value = true;
};
const openCategoryModal = (item = null) => {
 modalType.value = item ? 'edit' : 'add';
 currentItem.value = item;
 categoryForm.value = item ? {
 name: item.name,
 parent_id: item.parent_id,
 description: item.description
 } : {
 name: '',
 parent_id: 0,
 description: ''
 };
 showCategoryModal.value = true;
};
const openDetailModal = async (item) => {
  currentItem.value = item;
  
  try {
    const url = activeTab.value === 'products'
      ? `/api/products/${item.id}/detail?locale=zh-CN`
      : `/api/solutions/${item.id}/detail?locale=zh-CN`;
    
    const response = await fetch(url);
    const result = await response.json();
    
    if (result.success && result.data) {
      detailForm.value = {
        title: result.data.title || '',
        description: result.data.description || ''
      };
    } else {
      detailForm.value = {
        title: '',
        description: ''
      };
    }
  } catch (error) {
    detailForm.value = {
      title: '',
      description: ''
    };
  }
  
  showDetailModal.value = true;
};
const openMaterialModal = (item) => {
 currentItem.value = item;
 materialForm.value = {
 material_type: 'image',
 file_url: '',
 sort: materials.value.length + 1
 };
 fetchMaterials(item.id, activeTab.value === 'products' ? 'product' : 'solution');
 showMaterialModal.value = true;
};
const closeModal = () => {
 showModal.value = false;
 showCategoryModal.value = false;
 showDetailModal.value = false;
 showMaterialModal.value = false;
 currentItem.value = null;
};
const saveItem = async () => {
 try {
 const url = activeTab.value === 'products' ? '/api/products' : '/api/solutions';
 const method = modalType.value === 'add' ? 'POST' : 'PUT';
 const fullUrl = modalType.value === 'edit' ? `${url}/${currentItem.value.id}` : url;
 const response = await fetch(fullUrl, {
 method: method,
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify(formData.value)
 });
 const result = await response.json();
 if (result.success) {
 closeModal();
 if (activeTab.value === 'products') {
 fetchProducts();
 }
 else {
 fetchSolutions();
 }
 }
 else {
 alert(result.message || '保存失败');
 }
 }
 catch (error) {
 console.error('保存失败:', error);
 alert('保存失败');
 }
};
const saveCategory = async () => {
 try {
 const url = activeTab.value === 'products' ? '/api/products/categories' : '/api/solutions/categories';
 const method = modalType.value === 'add' ? 'POST' : 'PUT';
 const fullUrl = modalType.value === 'edit' ? `${url}/${currentItem.value.id}` : url;
 const response = await fetch(fullUrl, {
 method: method,
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify(categoryForm.value)
 });
 const result = await response.json();
 if (result.success) {
 closeModal();
 fetchCategories();
 }
 else {
 alert(result.message || '保存失败');
 }
 }
 catch (error) {
 console.error('保存失败:', error);
 alert('保存失败');
 }
};
const saveDetail = async () => {
 try {
 const url = activeTab.value === 'products'
 ? `/api/products/${currentItem.value.id}/detail`
 : `/api/solutions/${currentItem.value.id}/detail`;
 const response = await fetch(url, {
 method: 'PUT',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify(detailForm.value)
 });
 const result = await response.json();
 if (result.success) {
 closeModal();
 alert('保存成功');
 }
 else {
 alert(result.message || '保存失败');
 }
 }
 catch (error) {
 console.error('保存失败:', error);
 alert('保存失败');
 }
};
const deleteItem = async (item) => {
 if (!confirm(`确定要删除"${item.title}"吗？`))
 return;
 try {
 const url = activeTab.value === 'products'
 ? `/api/products/${item.id}`
 : `/api/solutions/${item.id}`;
 const response = await fetch(url, {
 method: 'DELETE'
 });
 const result = await response.json();
 if (result.success) {
 if (activeTab.value === 'products') {
 fetchProducts();
 }
 else {
 fetchSolutions();
 }
 }
 else {
 alert(result.message || '删除失败');
 }
 }
 catch (error) {
 console.error('删除失败:', error);
 alert('删除失败');
 }
};
const deleteCategory = async (item) => {
 if (!confirm(`确定要删除分类"${item.name}"吗？`))
 return;
 try {
 const url = activeTab.value === 'products'
 ? `/api/products/categories/${item.id}`
 : `/api/solutions/categories/${item.id}`;
 const response = await fetch(url, {
 method: 'DELETE'
 });
 const result = await response.json();
 if (result.success) {
 fetchCategories();
 }
 else {
 alert(result.message || '删除失败');
 }
 }
 catch (error) {
 console.error('删除失败:', error);
 alert('删除失败');
 }
};
const addMaterial = async () => {
 try {
 const url = activeTab.value === 'products'
 ? `/api/products/${currentItem.value.id}/materials`
 : `/api/solutions/${currentItem.value.id}/materials`;
 const response = await fetch(url, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json'
 },
 body: JSON.stringify(materialForm.value)
 });
 const result = await response.json();
 if (result.success) {
 materialForm.value = {
 material_type: 'image',
 file_url: '',
 sort: materials.value.length + 2
 };
 fetchMaterials(currentItem.value.id, activeTab.value === 'products' ? 'product' : 'solution');
 }
 else {
 alert(result.message || '上传失败');
 }
 }
 catch (error) {
 console.error('上传失败:', error);
 alert('上传失败');
 }
};
const deleteMaterial = async (material) => {
 if (!confirm('确定要删除这个素材吗？'))
 return;
 try {
 const url = activeTab.value === 'products'
 ? `/api/products/${currentItem.value.id}/materials/${material.id}`
 : `/api/solutions/${currentItem.value.id}/materials/${material.id}`;
 const response = await fetch(url, {
 method: 'DELETE'
 });
 const result = await response.json();
 if (result.success) {
 fetchMaterials(currentItem.value.id, activeTab.value === 'products' ? 'product' : 'solution');
 }
 else {
 alert(result.message || '删除失败');
 }
 }
 catch (error) {
 console.error('删除失败:', error);
 alert('删除失败');
 }
};
const handleSearch = () => {
 currentPage.value = 1;
 if (activeTab.value === 'products') {
 fetchProducts();
 }
 else {
 fetchSolutions();
 }
};
const clearSearch = () => {
 searchKeyword.value = '';
 currentPage.value = 1;
 if (activeTab.value === 'products') {
 fetchProducts();
 }
 else {
 fetchSolutions();
 }
};
const changePage = (page) => {
 if (page < 1 || page > totalPages.value)
 return;
 currentPage.value = page;
 if (activeTab.value === 'products') {
 fetchProducts();
 }
 else {
 fetchSolutions();
 }
};
const changeTab = (tab) => {
 activeTab.value = tab;
 activeSubTab.value = 'list';
 currentPage.value = 1;
};
const triggerUpload = () => {
 if (uploadInputRef.value) {
 uploadInputRef.value.click();
 }
};
const triggerMaterialUpload = () => {
 if (materialUploadRef.value) {
 materialUploadRef.value.click();
 }
};
const uploadMaterial = async (event) => {
 const file = event.target.files[0];
 if (!file)
 return;
 isUploading.value = true;
 const uploadFormData = new FormData();
 uploadFormData.append('file', file);
 uploadFormData.append('type', activeTab.value);
 try {
 const response = await fetch(`/api/upload/image?type=${activeTab.value}`, {
 method: 'POST',
 body: uploadFormData
 });
 const result = await response.json();
 if (result.success) {
 materialForm.value.file_url = result.url;
 materialForm.value.material_type = result.file_type || 'image';
 if (!materialForm.value.sort) {
 materialForm.value.sort = 1;
 }
 alert('上传成功');
 }
 else {
 alert(result.message || '上传失败');
 }
 }
 catch (error) {
 console.error('上传失败:', error);
 alert('上传失败');
 }
 finally {
 isUploading.value = false;
 }
};
const clearMaterialForm = () => {
 materialForm.value.file_url = '';
 materialForm.value.material_type = 'image';
 materialForm.value.sort = 1;
};
const uploadImage = async (event) => {
 const file = event.target.files[0];
 if (!file)
 return;
 isUploading.value = true;
 const uploadFormData = new FormData();
 uploadFormData.append('file', file);
 uploadFormData.append('type', activeTab.value);
 try {
 const response = await fetch(`/api/upload/image?type=${activeTab.value}`, {
 method: 'POST',
 body: uploadFormData
 });
 const result = await response.json();
 if (result.success) {
 formData.value.cover = result.url;
 alert('上传成功');
 }
 else {
 alert(result.message || '上传失败');
 }
 }
 catch (error) {
 console.error('上传失败:', error);
 alert('上传失败');
 }
 finally {
 isUploading.value = false;
 }
};
const currentCategories = computed(() => {
 return activeTab.value === 'products' ? productCategories.value : solutionCategories.value;
});
const currentItems = computed(() => {
 return activeTab.value === 'products' ? products.value : solutions.value;
});
const currentTotal = computed(() => {
 return activeTab.value === 'products' ? productTotal.value : solutionTotal.value;
});
onMounted(() => {
 fetchAdminInfo();
 fetchProducts();
 fetchSolutions();
 fetchCategories();
});
</script>

<template>
  <div class="admin-container" v-if="isLoggedIn">
    <header class="admin-header">
      <div class="header-left">
        <h1>管理后台</h1>
      </div>
      <div class="header-right">
        <span class="admin-name">{{ adminInfo?.username }}</span>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
      </div>
    </header>

    <main class="admin-main">
      <!-- 主标签页切换 -->
      <div class="tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'products' }]"
          @click="changeTab('products')"
        >
          📦 产品管理
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'solutions' }]"
          @click="changeTab('solutions')"
        >
          💡 解决方案管理
        </button>
      </div>

      <!-- 子标签页切换 -->
      <div class="sub-tabs">
        <button 
          :class="['sub-tab-btn', { active: activeSubTab === 'list' }]"
          @click="activeSubTab = 'list'"
        >
          列表 ({{ currentTotal }})
        </button>
        <button 
          :class="['sub-tab-btn', { active: activeSubTab === 'categories' }]"
          @click="activeSubTab = 'categories'"
        >
          分类 ({{ currentCategories.length }})
        </button>
      </div>

      <!-- 列表页面 -->
      <div v-if="activeSubTab === 'list'">
        <div class="search-bar">
          <input 
            v-model="searchKeyword"
            type="text" 
            placeholder="搜索名称..." 
            class="search-input"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch" class="search-btn">搜索</button>
          <button @click="clearSearch" class="clear-btn">清除</button>
          <button @click="openAddModal" class="add-btn">+ 新增</button>
        </div>

        <div class="list-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>名称</th>
                <th>分类</th>
                <th>描述</th>
                <th>封面</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in currentItems" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ getCategoryName(item.category_id, activeTab) }}</td>
                <td class="desc-cell">{{ item.description }}</td>
                <td>
                  <img v-if="item.cover" :src="item.cover" class="cover-img" />
                  <span v-else>无</span>
                </td>
                <td>
                  <button @click="openEditModal(item)" class="action-btn edit">编辑</button>
                  <button @click="openDetailModal(item)" class="action-btn detail">详情</button>
                  <button @click="openMaterialModal(item)" class="action-btn material">素材</button>
                  <button @click="deleteItem(item)" class="action-btn delete">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="currentItems.length === 0" class="empty-state">暂无数据</div>
          
          <!-- 分页组件 -->
          <div v-if="totalPages > 1" class="pagination">
            <button 
              @click="changePage(currentPage - 1)" 
              :disabled="currentPage === 1" 
              class="pagination-btn"
            >
              上一页
            </button>
            <span class="pagination-info">
              第 {{ currentPage }} / {{ totalPages }} 页
            </span>
            <button 
              @click="changePage(currentPage + 1)" 
              :disabled="currentPage === totalPages" 
              class="pagination-btn"
            >
              下一页
            </button>
          </div>
        </div>
      </div>

      <!-- 分类管理页面 -->
      <div v-if="activeSubTab === 'categories'">
        <div class="search-bar">
          <button @click="openCategoryModal()" class="add-btn">+ 新增分类</button>
        </div>

        <div class="list-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>分类名称</th>
                <th>父分类</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in currentCategories" :key="category.id">
                <td>{{ category.id }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.parent_id === 0 ? '顶级分类' : getParentCategoryName(category.parent_id, activeTab) }}</td>
                <td class="desc-cell">{{ category.description }}</td>
                <td>
                  <button @click="openCategoryModal(category)" class="action-btn edit">编辑</button>
                  <button @click="deleteCategory(category)" class="action-btn delete">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="currentCategories.length === 0" class="empty-state">暂无数据</div>
        </div>
      </div>
    </main>

    <!-- 编辑/新增产品/解决方案模态框 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ modalType === 'add' ? '新增' : '编辑' }}{{ activeTab === 'products' ? '产品' : '解决方案' }}</h3>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>名称</label>
            <input v-model="formData.title" type="text" class="form-input" placeholder="请输入名称" />
          </div>
          <div class="form-group">
            <label>分类</label>
            <select v-model="formData.category_id" class="form-input">
              <option value="">请选择分类</option>
              <option v-for="cat in currentCategories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="formData.description" class="form-input" placeholder="请输入描述"></textarea>
          </div>
          <div class="form-group">
            <label>封面图片</label>
            <div v-if="formData.cover" class="cover-preview">
              <img :src="formData.cover" class="preview-img" />
              <button @click="formData.cover = ''" class="remove-cover-btn">移除</button>
            </div>
            <div v-else>
              <input ref="uploadInputRef" type="file" accept="image/*" @change="uploadImage" class="upload-input" :disabled="isUploading" />
              <span v-if="isUploading" class="upload-status">上传中...</span>
              <span v-else class="upload-hint" @click="triggerUpload">点击或拖拽上传图片</span>
            </div>
            <input v-model="formData.cover" type="hidden" />
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="cancel-btn">取消</button>
          <button @click="saveItem" class="save-btn">保存</button>
        </div>
      </div>
    </div>

    <!-- 分类管理模态框 -->
    <div v-if="showCategoryModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ modalType === 'add' ? '新增' : '编辑' }}分类</h3>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>分类名称</label>
            <input v-model="categoryForm.name" type="text" class="form-input" placeholder="请输入分类名称" />
          </div>
          <div class="form-group">
            <label>父分类</label>
            <select v-model="categoryForm.parent_id" class="form-input">
              <option :value="0">顶级分类</option>
              <option v-for="cat in currentCategories.filter(c => c.parent_id === 0)" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="categoryForm.description" class="form-input" placeholder="请输入描述"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="cancel-btn">取消</button>
          <button @click="saveCategory" class="save-btn">保存</button>
        </div>
      </div>
    </div>

    <!-- 详情管理模态框 -->
    <div v-if="showDetailModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ currentItem?.title }} - 详情编辑</h3>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>标题</label>
            <input v-model="detailForm.title" type="text" class="form-input" placeholder="请输入标题" />
          </div>
          <div class="form-group">
            <label>详细描述</label>
            <textarea v-model="detailForm.description" class="form-input large-textarea" placeholder="请输入详细描述"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="cancel-btn">取消</button>
          <button @click="saveDetail" class="save-btn">保存</button>
        </div>
      </div>
    </div>

    <!-- 素材管理模态框 -->
    <div v-if="showMaterialModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content material-modal">
        <div class="modal-header">
          <h3>{{ currentItem?.title }} - 素材管理</h3>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>上传素材（图片或视频）</label>
            <div v-if="materialForm.file_url" class="cover-preview">
              <img v-if="materialForm.material_type === 'image'" :src="materialForm.file_url" class="preview-img" />
              <div v-else class="preview-video">📹 视频</div>
              <button @click="clearMaterialForm" class="remove-cover-btn">移除</button>
            </div>
            <div v-else>
              <input ref="materialUploadRef" type="file" accept="image/*,video/*" @change="uploadMaterial" class="upload-input" :disabled="isUploading" />
              <span v-if="isUploading" class="upload-status">上传中...</span>
              <span v-else class="upload-hint" @click="triggerMaterialUpload">点击上传图片或视频</span>
            </div>
            <input v-model="materialForm.file_url" type="hidden" />
            <input v-model="materialForm.material_type" type="hidden" />
          </div>
          <div class="form-group">
            <label>排序</label>
            <input v-model.number="materialForm.sort" type="number" class="form-input" placeholder="默认1" />
          </div>
          <button @click="addMaterial" class="upload-btn" :disabled="!materialForm.file_url">添加素材</button>

          <div class="materials-list">
            <h4>已上传素材</h4>
            <div v-if="materials.length === 0" class="empty-state">暂无素材</div>
            <div v-else class="materials-grid">
              <div v-for="material in materials" :key="material.id" class="material-item">
                <img v-if="material.material_type === 'image'" :src="material.file_url" class="material-img" />
                <div v-else class="material-video">📹 视频</div>
                <button @click="deleteMaterial(material)" class="material-delete">删除</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" class="cancel-btn">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  min-height: 100vh;
  background: #f5f5f5;
}

.admin-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left h1 {
  margin: 0;
  font-size: var(--text-xl);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.admin-name {
  font-weight: 500;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.admin-main {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: var(--text-sm);
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.tab-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.sub-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.sub-tab-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #e9ecef;
  cursor: pointer;
  font-size: var(--text-sm);
  transition: all 0.3s;
}

.sub-tab-btn.active {
  background: #667eea;
  color: white;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  max-width: 300px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: var(--text-sm);
}

.search-btn, .clear-btn, .add-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: var(--text-sm);
  transition: all 0.3s;
}

.search-btn {
  background: #667eea;
  color: white;
}

.clear-btn {
  background: #f0f0f0;
  color: #666;
}

.add-btn {
  background: #28a745;
  color: white;
}

.list-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.desc-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cover-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--text-xs);
  margin-right: 5px;
  transition: all 0.3s;
}

.action-btn.edit {
  background: #17a2b8;
  color: white;
}

.action-btn.detail {
  background: #667eea;
  color: white;
}

.action-btn.material {
  background: #ffc107;
  color: #333;
}

.action-btn.delete {
  background: #dc3545;
  color: white;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: var(--text-muted);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  padding: 10px;
}

.pagination-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-btn:hover:not(:disabled) {
  background: #f0f0f0;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: var(--text-sm);
  color: #666;
}

.upload-input {
  display: none;
}

.upload-hint {
  display: inline-block;
  padding: 10px 20px;
  border: 2px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.2s;
}

.upload-hint:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.upload-status {
  display: inline-block;
  padding: 10px 20px;
  color: #1890ff;
}

.cover-preview {
  position: relative;
  display: inline-block;
}

.preview-img {
  max-width: 200px;
  max-height: 150px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.remove-cover-btn {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  font-size: var(--text-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-video {
  width: 200px;
  height: 150px;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  font-size: var(--text-2xl);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content.material-modal {
  max-width: 700px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: var(--text-2xl);
  cursor: pointer;
  color: var(--text-muted);
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  color: #333;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: var(--text-sm);
  box-sizing: border-box;
}

.form-input.large-textarea {
  min-height: 200px;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.cancel-btn, .save-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: var(--text-sm);
  transition: all 0.3s;
}

.cancel-btn {
  background: #f0f0f0;
  color: #666;
}

.save-btn {
  background: #667eea;
  color: white;
}

.upload-btn {
  width: 100%;
  padding: 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: var(--text-sm);
}

.materials-list {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eee;
}

.materials-list h4 {
  margin-bottom: 16px;
  color: #333;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.material-item {
  position: relative;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.material-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.material-video {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  font-size: var(--text-2xl);
}

.material-delete {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: var(--text-xs);
}

@media (max-width: 768px) {
  .admin-main {
    padding: 15px;
  }
  
  .search-bar {
    flex-wrap: wrap;
  }
  
  .search-input {
    max-width: 100%;
  }
  
  .data-table {
    display: block;
    overflow-x: auto;
  }
}
</style>