## 前言
自己做了一年的RN，目前回到web开发中，利用react + dva + antd 进行web开发, 从web架构受到了一些灵感，觉得很方便开发，便琢磨着迁移到RN上来。

## 技术栈
react@16.2.0 + react-native@0.52.0 + react-navigation@1.1.2 + dva-core@1.1.0 + react-redux@5.0.7 + antd-mobile@2.1.6

## 功能一览

- [x] 动态配置路由，方便多人开发
- [x] 集成了antd-mobile UI库
- [x] 集成了dva，减少模版代码
- [x] 集成了react-navigation到redux

## 项目结构

```
.
├─android                            
├─ios    
├─app                                        // 页面主文件
|  ├─utils                           
|  |   ├─dva.js                             //dva配置文件
|  |   ├─storage.js                         // 封装的存储方法
|  |   └index.js          
|  ├─components                             // 公用组件库
|  |   ├─Button.js                   
|  |   ├─index.js                  
|  |   └Touchable.js 
|  ├─images          
|  ├─services        
|  ├─src                        
|  |    ├─Account 
|  |    |   ├─Account1
|  |    |   |   ├─components
|  |    |   |   ├─containers
|  |    |   |   |   ├─Account1.js
|  |    |   |   ├─models
|  |    |   |   |   ├─index.js
|  |    |   |   ├─index.js
|  |    |   |   ├─routes.js
|  |    |   ├─Account2 
|  |    |   ├─Account3
|  |    ├─Home 
|  |    |   ├─Home1       
|  |    |   ├─Home2 
|  |    |   ├─Home3
|  |    ├─Login               
|  |    |   ├─index.js
|  |    └manifest.js
|  ├─index.js                                //入口
|  ├─route.js                               // 路由配置
├─node_modules                        
├─.babelrc                    
├─.flowconfig                      
├─.gitignore                        
├─.watchmanconfig            
├─app.json                     
├─App.test.js               
├─index.js                          // app的主入口
├─jsconfig.json             
├─package.json              
├─README.md
├─yarn.lock
```
