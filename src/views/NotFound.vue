<template>
  <div class="not-found">
    <div class="not-found-container">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-message">{{ t('pageNotFound') }}</p>
      <router-link to="/" class="not-found-link">{{ t('goHome') }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getMessages } from '../i18n'

const messages = computed(() => getMessages())
const t = (key) => messages.value[key] || key
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}

.not-found-container {
  text-align: center;
  padding: 40px;
}

.not-found-title {
  font-size: var(--text-6xl);
  color: var(--accent);
  margin-bottom: 20px;
}

.not-found-message {
  font-size: var(--text-lg);
  color: var(--text);
  margin-bottom: 30px;
}

.not-found-link {
  display: inline-block;
  padding: 12px 24px;
  background: var(--accent);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: var(--text-base);
  transition: background 0.3s;
}

.not-found-link:hover {
  background: #6b29c9;
}
</style>