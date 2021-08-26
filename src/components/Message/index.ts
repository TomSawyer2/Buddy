import Vue from "vue";
import Main from "./Message.vue";

const MessageConstructor = Vue.extend(Main);

const instances: any = [];
let seed = 1;
const Message = function (
  options: any,
  typeClass: any
) {
  options = options || {};
  if (typeof options === "string") {
    options = {
      message: options,
      typeClass: typeClass,
    };
  }
  const id = "message_" + seed++;
  const instance = new MessageConstructor({
    data: options,
  });
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = 10000;
  instances.push(instance);
  return instance.vm;
};

Message.success = function (option: any) {
  Message(option, "message--success");
};
Message.error = function (option: any) {
  Message(option, "message--error");
};

Message.close = function (id: any) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      instances.splice(i, 1);
      break;
    }
  }
};

Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
