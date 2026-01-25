import { Result } from "../types/result";
import { User } from "../types/user";
import captchaImg from '../assets/login/login-yzm.jpg';

let user: User = {
  'userId': '1992',
  'username': 'admin',
}

const menus = [
  {
    id: "/workspace/workbench",
    icon: "layui-icon-home",
    title: "首页"
  },
  {
    id: "/business",
    icon: "layui-icon-form",
    title: "业务申请",
    children: [
      {
        id: "/business/ownership",
        icon: "",
        title: "权属申请"
      }
    ]
  },
  {
    id: "/unit",
    icon: "layui-icon-group",
    title: "单位管理",
    children: [
      {
        id: "/unit/card",
        icon: "",
        title: "单位卡片"
      }
    ]
  },
  {
    id: "/courtyard",
    icon: "layui-icon-home",
    title: "院落管理",
    children: [
      {
        id: "/courtyard/edit",
        icon: "",
        title: "院落编辑"
      }
    ]
  },
  {
    id: "/ledger",
    icon: "layui-icon-table",
    title: "数据台账",
    children: [
      {
        id: "/ledger/lending",
        icon: "",
        title: "出借台账"
      }
    ]
  },
]

const getInfo = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let token = item ? item.token : null;
  let result: Result = {
    code: 200,
    msg: "操作成功",
    data: user,
    success: true
  }
  if (item || token) {
    result.code = 99998;
    result.msg = "请重新登录";
    result.success = false;
  }
  return result;
}

const getPermission = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let token = item ? item.token : null;
  let result: Result = {
    code: 200,
    msg: "操作成功",
    data: ['sys:user:add', 'sys:user:edit', 'sys:user:delete', 'sys:user:import', 'sys:user:export'],
    success: true
  }
  if (item || token) {
    result.code = 99998;
    result.msg = "请重新登录";
    result.success = false;
  }
  return result;
}

const getMenu = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let token = item ? item.token : null;
  let result: Result = {
    code: 200,
    msg: "操作成功",
    data: menus,
    success: true
  }
  if (item || token) {
    result.code = 99998;
    result.msg = "请重新登录";
    result.success = false;
  }
  return result;
}

const getLogin = (req: any, res: any) => {
  let item = JSON.parse(req.body);
  let account = item.account;
  let password = item.password;
  if (account === 'admin' && password === '123456') {
    return {
      'code': 200,
      'msg': '登陆成功',
      'data': {
        'userId': '35002',
        'token': 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJvcmdDb2RlIjoiMzUwMDAiLCJkZXB0Q29kZSI6IjM1MDAwIiwiYXVkIjoiYWRtaW4iLCJpc3MiOiJhZG1pbiIsImV4cCI6MTU5MzUzNTU5OH0.0pJAojRtT5lx6PS2gH_Q9BmBxeNlgBL37ABX22HyDlebbr66cCjVYZ0v0zbLO_9241FX9-FZpCkEqE98MQOyWw',
      }
    }
  } else {
    return {
      'code': 500,
      'msg': '登陆失败,账号密码不正确'
    }
  }
}

const getUpload = (req: any, res: any) => {
  return {
    'code': 200,
    'msg': '上传成功',
    'success': true
  }
}

// 获取验证码
const getCaptcha = () => {
  return {
    'code': 200,
    'msg': '操作成功',
    'data': {
      'key': 'mock-captcha-key-' + Date.now(),
      'image': captchaImg
    },
    'success': true
  }
}

export default {
  getInfo, getMenu, getLogin, getPermission, getUpload, getCaptcha
}