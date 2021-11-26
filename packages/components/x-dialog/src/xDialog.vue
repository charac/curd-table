<template>
  <el-dialog
    :id="dialogId"
    :title="title"
    :close-on-click-modal="closeOnClickModal"
    :lock-scroll="false"
    v-model:visible="dialogVisible"
    :width="size"
    @open="handleOpen"
    @close="handleClose"
    :before-close="handleBeforeClose"
    class="x-dialog"
  >
    <div class="fillbody" v-loading="loading" element-loading-text="拼命加载中">
      <slot>内容</slot>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">{{ cancelButtonText }}</el-button>
      <el-button
        v-show="showOtherConfirmButton"
        type="primary"
        size="small"
        :disabled="confirmOtherButtonDisabled || loading"
        :loading="confirmOtherButtonLoading"
        @click="otherOk"
        >{{ confirmOtherButtonText }}</el-button
      >
      <el-button
        size="small"
        v-show="showConfirmButton"
        type="primary"
        :disabled="confirmButtonDisabled || loading"
        :loading="confirmButtonLoading"
        @click="ok"
        >{{ confirmButtonText }}</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "xDialog",
  props: {
    size: {
      type: String,
      default: "50%",
    },
    title: {
      type: String,
      default: "提示",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    confirmButtonLoading: {
      type: Boolean,
      default: false,
    },
    confirmButtonDisabled: {
      type: Boolean,
      default: false,
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    confirmButtonText: {
      type: String,
      default: "保存",
    },
    cancelButtonText: {
      type: String,
      default: "取消",
    },
    closeOnClickModal: {
      type: Boolean,
      default: false,
    },
    // otherBuTTON
    showOtherConfirmButton: {
      type: Boolean,
      default: false,
    },
    confirmOtherButtonText: {
      type: String,
      default: "other",
    },
    confirmOtherButtonDisabled: {
      type: Boolean,
      default: false,
    },
    confirmOtherButtonLoading: {
      type: Boolean,
      default: false,
    },
    onOpen: Function,
    onBeforeClose: Function,
    onClose: Function,
    onOk: Function,
    onOtherOk: Function,
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
  },
  data() {
    return {
      dialogVisible: this.visible,
      loading: false,
      dialogId: "dialog-" + new Date().getTime(),
    };
  },
  methods: {
    handleOpen() {
      if (this.onOpen) {
        this.$nextTick(() => {
          this.onOpen();
        });
      }
    },
    handleBeforeClose(done) {
      let cancel = false;
      if (this.onBeforeClose) {
        cancel = this.onBeforeClose() === true;
      }
      if (!cancel) done();
    },
    handleClose() {
      if (this.onClose) {
        this.onClose();
      }
    },
    close() {
      this.dialogVisible = false;
    },
    ok() {
      if (this.onOk) {
        this.onOk();
      } else {
        this.dialogVisible = false;
      }
    },
    otherOk() {
      if (this.onOtherOk) {
        this.onOtherOk();
      } else {
        this.dialogVisible = false;
      }
    },
  },
};
</script>
<style lang="scss">
.el-dialog--custom {
  width: auto;
}
.el-dialog__body {
  padding: 20px;
}
// .dialog-footer {
//     padding-top: 15px;
//     border-top: 1px dashed #e3e4e6;
// }
</style>
