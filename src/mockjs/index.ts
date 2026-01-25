// @ts-ignore
import Mock from'mockjs';
import user from './user';
import business from './business';
import ledger from './ledger';
import unit from './unit';
import courtyard from './courtyard';
import dashboard from './dashboard';
import dataScreen from './dataScreen';

Mock.mock(/\/user\/login/,'post',(req: any,res: any) =>{
    return user.getLogin(req,res)
});

Mock.mock(/\/captcha/,'post',() =>{
    return user.getCaptcha()
});

Mock.mock(/\/user\/info/,'post',(req: any,res: any) =>{
    return user.getInfo(req,res)
});

Mock.mock(/\/user\/menu/,'get',(req: any,res: any) =>{
    return user.getMenu(req,res)
});

Mock.mock(/\/user\/permission/,'get',(req: any,res: any) =>{
    return user.getPermission(req,res)
});

Mock.mock(/\/file\/upload/,'post',(req: any,res: any) =>{
    return user.getUpload(req,res)
});

// 业务申请相关接口
Mock.mock(/\/business\/ownership\/init/,'get',(req: any,res: any) =>{
    return business.getBusinessInit(req,res)
});

Mock.mock(/\/unit\/list/,'post',(req: any,res: any) =>{
    return business.getUnitList(req,res)
});

Mock.mock(/\/building\/list/,'post',(req: any,res: any) =>{
    return business.getBuildingList(req,res)
});

Mock.mock(/\/business\/ownership\/save/,'post',(req: any,res: any) =>{
    return business.saveApplication(req,res)
});

// 出借台账相关接口
Mock.mock(/\/ledger\/lending\/list/,'post',(req: any) =>{
    return ledger.getLendingList(req)
});

Mock.mock(/\/ledger\/lending\/save/,'post',(req: any) =>{
    return ledger.saveLending(req)
});

Mock.mock(/\/ledger\/lending\/delete/,'post',(req: any) =>{
    return ledger.deleteLending(req)
});

Mock.mock(/\/ledger\/nature\/options/,'get',() =>{
    return ledger.getNatureOptions()
});

// 单位管理相关接口
Mock.mock(/\/unit\/org-tree/,'post',(req: any) =>{
    return unit.getOrgTree(req)
});

Mock.mock(/\/unit\/detail/,'post',(req: any) =>{
    return unit.getUnitDetail(req)
});

Mock.mock(/\/unit\/area-calculation/,'post',(req: any) =>{
    return unit.getAreaCalculation(req)
});

// 院落编辑相关接口
Mock.mock(/\/courtyard\/tree/,'post',(req: any) =>{
    return courtyard.getCourtyardTree(req)
});

Mock.mock(/\/courtyard\/floor\/info/,'post',(req: any) =>{
    return courtyard.getFloorInfo(req)
});

Mock.mock(/\/courtyard\/floor\/rooms/,'post',(req: any) =>{
    return courtyard.getFloorRooms(req)
});

// 首页工作台接口
Mock.mock(/\/dashboard\/overview/,'get',() =>{
    return dashboard.getDashboardOverview()
});

// 数据大屏接口
Mock.mock(/\/dataScreen\/getData/,'post',() =>{
    return dataScreen.getDataScreenData()
});

// 设置延迟模拟真实网络
Mock.setup({ timeout: '200-500' });

export default Mock;