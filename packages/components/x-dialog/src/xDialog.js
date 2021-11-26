import Vue from 'vue';
import { utilConvert, hasOwn } from "@/libs/util.convert";
import xdialog from './xDialog.vue';
const DialogConstructor = Vue.extend(xdialog);

function show (vnode, title, opts) {
  let instance = new DialogConstructor({
    el: document.createElement('div')
  });
  instance.title = title;
  var ttt = instance.$createElement("div", {
    class: 'fillcontain'
  }, [vnode]);
  instance.$slots.default = [ttt];
  for (let prop in opts) {
    if (opts.hasOwnProperty(prop)) {
      instance[prop] = opts[prop];
    }
  }

  let app = (this.$$root || this.$root).$el;
  let oldClose = instance.onClose;
  instance.onClose = () => {
    app.removeChild(instance.$el);
    oldClose.call(instance);
  }
  app.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
}

function init (node) {
  if (!node.$store) {
    node.$store = this.$store;
  }
  if (!node.$$root) {
    node.$$root = this.$$root || this.$root;
  }
  if (node.$children && node.$children.length > 0) {
    node.$children.forEach(c => {
      init.call(this, c);
    });
  }
}

export default function (vnode, title = "", callback = function () { }) {
  if (!hasOwn(vnode, 'componentOptions')) {
    throw new Error("参数vnode只能是VNode类型");
  }

  let cb = callback || function () { };
  if (!utilConvert.isFunction(cb)) {
    throw new Error("参数callback只能是Function类型");
  }
  this.$$root = this.$$root || this.$root;
  let _this = this;
  let dialog = null;
  let node = null;
  let opts = {
    closeOnClickModal: false,
    onOpen () {
      if (!utilConvert.isArray(this.$slots.default)) return;
      let instance = this;
      dialog = {
        owner: this,
        close () {
          instance.close();
        },
        set loading (value) {
          instance.loading = value;
        },
        // 设置标题
        get title () {
          return instance.title;
        },
        set title (value) {
          instance.title = value;
        },
        // 设置dialog size
        set size (value) {
          instance.size = value;
        },
        get size () {
          return instance.size;
        },
        get okLoading () {
          return instance.confirmButtonLoading;
        },
        set okLoading (value) {
          instance.confirmButtonLoading = value;
        },
        get okOtherLoading () {
          return instance.confirmOtherButtonLoading;
        },
        set okOtherLoading (value) {
          instance.confirmOtherButtonLoading = value;
        },
        get okDisabled () {
          return instance.confirmButtonDisabled;
        },
        set okDisabled (value) {
          instance.confirmButtonDisabled = value;
        },
        get okOtherDisabled () {
          return instance.confirmOtherButtonDisabled;
        },
        set okOtherDisabled (value) {
          instance.confirmOtherButtonDisabled = value;
        },
        get okShow () {
          return instance.showConfirmButton;
        },
        set okShow (value) {
          instance.showConfirmButton = value;
        },
        get okOtherShow () {
          return instance.showOtherConfirmButton;
        },
        set okOtherShow (value) {
          instance.showOtherConfirmButton = value;
        },
        get okText () {
          return instance.confirmButtonText;
        },
        set okText (value) {
          instance.confirmButtonText = value;
        },
        get okOtherText () {
          return instance.confirmOtherButtonText;
        },
        set okOtherText (value) {
          instance.confirmOtherButtonText = value;
        },
        get cancelText () {
          return instance.cancelButtonText;
        },
        set cancelText (value) {
          instance.cancelButtonText = value;
        },
      }
      instance.confirmButtonLoading = false;
      instance.confirmOtherButtonLoading = false;
      if (this.$slots.default[0] && this.$slots.default[0].children && this.$slots.default[0].children[0]) {
        node = this.$slots.default[0].children[0].componentInstance;
        if (node) {
          node.dialog = dialog;
          node.owner = _this;
          init.call(_this, node);
          node.$emit("opened", dialog);
        }
      }
    },
    onClose () {
      dialog.okLoading = false;
      dialog.loading = false;
      if (node) node.$emit("closed", dialog);
    },
    onOk () {
      if (node) node.$emit("ok", dialog, cb);
    },
    onOtherOk () {
      if (node) node.$emit("otherOk", dialog, cb);
    },
  };

  if (vnode.data.style) {
    if (vnode.data.style.width === "100%" && vnode.data.style.height === "100%") {
      opts.size = "full";
    }
  }
  if (vnode.data.props && utilConvert.isBoolean(vnode.data.props.loading)) {
    opts.loading = vnode.data.props.loading;
  }
  show.call(this, vnode, title, opts);
}