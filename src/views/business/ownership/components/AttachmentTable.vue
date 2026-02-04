<template>
  <div class="attachment-table" v-if="attachments.length > 0">
    <table>
      <thead>
        <tr>
          <th>文件名称</th>
          <th>上传时间</th>
          <th>文件大小</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in attachments" :key="file.id">
          <td>{{ file.name }}</td>
          <td>{{ file.uploadTime }}</td>
          <td>{{ formatFileSize(file.size) }}</td>
          <td class="actions">
            <a href="javascript:;" @click="handlePreview(file)">预览</a>
            <a href="javascript:;" @click="handleDownload(file)">下载</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
export interface AttachmentFile {
  id: string
  name: string
  uploadTime: string
  size: number
  url: string
}

defineProps<{
  attachments: AttachmentFile[]
}>()

const emit = defineEmits(['preview', 'download'])

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}

// 预览
const handlePreview = (file: AttachmentFile) => {
  emit('preview', file)
  window.open(file.url, '_blank')
}

// 下载
const handleDownload = (file: AttachmentFile) => {
  emit('download', file)
  const link = document.createElement('a')
  link.href = file.url
  link.download = file.name
  link.click()
}
</script>

<style lang="scss" scoped>
.attachment-table {
  margin-top: 10px;
}

.attachment-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.attachment-table th,
.attachment-table td {
  padding: 10px 15px;
  text-align: left;
  border: 1px solid #e8e8e8;
}

.attachment-table th {
  background: #fafafa;
  color: #333;
  font-weight: normal;
}

.attachment-table td {
  color: #666;
}

.attachment-table .actions a {
  color: #1890ff;
  margin-right: 15px;
  text-decoration: none;
}

.attachment-table .actions a:hover {
  text-decoration: underline;
}
</style>
