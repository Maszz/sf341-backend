'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Backend Server</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-2b0295e1168a54386b2febf060b5f706285b33711ae6014a6792aff696d7d304a78f3f64c735e9c3b4b42dda81d1c022ed5efbc7cb35e3fd728cb03217ffb8f6"' : 'data-target="#xs-controllers-links-module-AppModule-2b0295e1168a54386b2febf060b5f706285b33711ae6014a6792aff696d7d304a78f3f64c735e9c3b4b42dda81d1c022ed5efbc7cb35e3fd728cb03217ffb8f6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-2b0295e1168a54386b2febf060b5f706285b33711ae6014a6792aff696d7d304a78f3f64c735e9c3b4b42dda81d1c022ed5efbc7cb35e3fd728cb03217ffb8f6"' :
                                            'id="xs-controllers-links-module-AppModule-2b0295e1168a54386b2febf060b5f706285b33711ae6014a6792aff696d7d304a78f3f64c735e9c3b4b42dda81d1c022ed5efbc7cb35e3fd728cb03217ffb8f6"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-2b0295e1168a54386b2febf060b5f706285b33711ae6014a6792aff696d7d304a78f3f64c735e9c3b4b42dda81d1c022ed5efbc7cb35e3fd728cb03217ffb8f6"' : 'data-target="#xs-injectables-links-module-AppModule-2b0295e1168a54386b2febf060b5f706285b33711ae6014a6792aff696d7d304a78f3f64c735e9c3b4b42dda81d1c022ed5efbc7cb35e3fd728cb03217ffb8f6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2b0295e1168a54386b2febf060b5f706285b33711ae6014a6792aff696d7d304a78f3f64c735e9c3b4b42dda81d1c022ed5efbc7cb35e3fd728cb03217ffb8f6"' :
                                        'id="xs-injectables-links-module-AppModule-2b0295e1168a54386b2febf060b5f706285b33711ae6014a6792aff696d7d304a78f3f64c735e9c3b4b42dda81d1c022ed5efbc7cb35e3fd728cb03217ffb8f6"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-370f2ee60f8237af593d22630778a1741a309f7907626ade0943c09ad39acf8b55c367f5970d6962717b91e0e82316e9e83437af3ba7ef96139317e1405fd888"' : 'data-target="#xs-controllers-links-module-AuthModule-370f2ee60f8237af593d22630778a1741a309f7907626ade0943c09ad39acf8b55c367f5970d6962717b91e0e82316e9e83437af3ba7ef96139317e1405fd888"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-370f2ee60f8237af593d22630778a1741a309f7907626ade0943c09ad39acf8b55c367f5970d6962717b91e0e82316e9e83437af3ba7ef96139317e1405fd888"' :
                                            'id="xs-controllers-links-module-AuthModule-370f2ee60f8237af593d22630778a1741a309f7907626ade0943c09ad39acf8b55c367f5970d6962717b91e0e82316e9e83437af3ba7ef96139317e1405fd888"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-370f2ee60f8237af593d22630778a1741a309f7907626ade0943c09ad39acf8b55c367f5970d6962717b91e0e82316e9e83437af3ba7ef96139317e1405fd888"' : 'data-target="#xs-injectables-links-module-AuthModule-370f2ee60f8237af593d22630778a1741a309f7907626ade0943c09ad39acf8b55c367f5970d6962717b91e0e82316e9e83437af3ba7ef96139317e1405fd888"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-370f2ee60f8237af593d22630778a1741a309f7907626ade0943c09ad39acf8b55c367f5970d6962717b91e0e82316e9e83437af3ba7ef96139317e1405fd888"' :
                                        'id="xs-injectables-links-module-AuthModule-370f2ee60f8237af593d22630778a1741a309f7907626ade0943c09ad39acf8b55c367f5970d6962717b91e0e82316e9e83437af3ba7ef96139317e1405fd888"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventModule.html" data-type="entity-link" >EventModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EventModule-4c0e9ef172d620a63c9a3e9be102efa46c750c4802e4d34d143fd3c98da53ad039a42825520efbdb3bfd9fe24bf33a2300793b7e8cb245262a15f3d8d45445f9"' : 'data-target="#xs-controllers-links-module-EventModule-4c0e9ef172d620a63c9a3e9be102efa46c750c4802e4d34d143fd3c98da53ad039a42825520efbdb3bfd9fe24bf33a2300793b7e8cb245262a15f3d8d45445f9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventModule-4c0e9ef172d620a63c9a3e9be102efa46c750c4802e4d34d143fd3c98da53ad039a42825520efbdb3bfd9fe24bf33a2300793b7e8cb245262a15f3d8d45445f9"' :
                                            'id="xs-controllers-links-module-EventModule-4c0e9ef172d620a63c9a3e9be102efa46c750c4802e4d34d143fd3c98da53ad039a42825520efbdb3bfd9fe24bf33a2300793b7e8cb245262a15f3d8d45445f9"' }>
                                            <li class="link">
                                                <a href="controllers/EventController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EventModule-4c0e9ef172d620a63c9a3e9be102efa46c750c4802e4d34d143fd3c98da53ad039a42825520efbdb3bfd9fe24bf33a2300793b7e8cb245262a15f3d8d45445f9"' : 'data-target="#xs-injectables-links-module-EventModule-4c0e9ef172d620a63c9a3e9be102efa46c750c4802e4d34d143fd3c98da53ad039a42825520efbdb3bfd9fe24bf33a2300793b7e8cb245262a15f3d8d45445f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventModule-4c0e9ef172d620a63c9a3e9be102efa46c750c4802e4d34d143fd3c98da53ad039a42825520efbdb3bfd9fe24bf33a2300793b7e8cb245262a15f3d8d45445f9"' :
                                        'id="xs-injectables-links-module-EventModule-4c0e9ef172d620a63c9a3e9be102efa46c750c4802e4d34d143fd3c98da53ad039a42825520efbdb3bfd9fe24bf33a2300793b7e8cb245262a15f3d8d45445f9"' }>
                                        <li class="link">
                                            <a href="injectables/EventService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoggerModule-3a23e57d7f7557f3740acc6196d7665854037928ad2bc2feecb1d153d947bba250f35c46d85e804b4b00e6916858f0cea491451fc087ae80b8ae63d03b9ebc77"' : 'data-target="#xs-injectables-links-module-LoggerModule-3a23e57d7f7557f3740acc6196d7665854037928ad2bc2feecb1d153d947bba250f35c46d85e804b4b00e6916858f0cea491451fc087ae80b8ae63d03b9ebc77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-3a23e57d7f7557f3740acc6196d7665854037928ad2bc2feecb1d153d947bba250f35c46d85e804b4b00e6916858f0cea491451fc087ae80b8ae63d03b9ebc77"' :
                                        'id="xs-injectables-links-module-LoggerModule-3a23e57d7f7557f3740acc6196d7665854037928ad2bc2feecb1d153d947bba250f35c46d85e804b4b00e6916858f0cea491451fc087ae80b8ae63d03b9ebc77"' }>
                                        <li class="link">
                                            <a href="injectables/LoggerMiddleware.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerMiddleware</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoggerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessageModule.html" data-type="entity-link" >MessageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-MessageModule-5eae40081c927945e8625cd52f1cc45510c68c86efe752c9d2cf6d979aeeac774bc5110465cc427f1c4b2c046a72b8c94407f22aa5489c5566bb78234bb7cdd7"' : 'data-target="#xs-controllers-links-module-MessageModule-5eae40081c927945e8625cd52f1cc45510c68c86efe752c9d2cf6d979aeeac774bc5110465cc427f1c4b2c046a72b8c94407f22aa5489c5566bb78234bb7cdd7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MessageModule-5eae40081c927945e8625cd52f1cc45510c68c86efe752c9d2cf6d979aeeac774bc5110465cc427f1c4b2c046a72b8c94407f22aa5489c5566bb78234bb7cdd7"' :
                                            'id="xs-controllers-links-module-MessageModule-5eae40081c927945e8625cd52f1cc45510c68c86efe752c9d2cf6d979aeeac774bc5110465cc427f1c4b2c046a72b8c94407f22aa5489c5566bb78234bb7cdd7"' }>
                                            <li class="link">
                                                <a href="controllers/MessageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MessageModule-5eae40081c927945e8625cd52f1cc45510c68c86efe752c9d2cf6d979aeeac774bc5110465cc427f1c4b2c046a72b8c94407f22aa5489c5566bb78234bb7cdd7"' : 'data-target="#xs-injectables-links-module-MessageModule-5eae40081c927945e8625cd52f1cc45510c68c86efe752c9d2cf6d979aeeac774bc5110465cc427f1c4b2c046a72b8c94407f22aa5489c5566bb78234bb7cdd7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessageModule-5eae40081c927945e8625cd52f1cc45510c68c86efe752c9d2cf6d979aeeac774bc5110465cc427f1c4b2c046a72b8c94407f22aa5489c5566bb78234bb7cdd7"' :
                                        'id="xs-injectables-links-module-MessageModule-5eae40081c927945e8625cd52f1cc45510c68c86efe752c9d2cf6d979aeeac774bc5110465cc427f1c4b2c046a72b8c94407f22aa5489c5566bb78234bb7cdd7"' }>
                                        <li class="link">
                                            <a href="injectables/MessageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-a6a7e6c9aac02ca46f4facf6214196574423185f77caa26262f1437f6a20c90077818884d9986e3d0f27b54a1a486bcf5a99bc84f07796dba03caadd2e6f14fd"' : 'data-target="#xs-injectables-links-module-PrismaModule-a6a7e6c9aac02ca46f4facf6214196574423185f77caa26262f1437f6a20c90077818884d9986e3d0f27b54a1a486bcf5a99bc84f07796dba03caadd2e6f14fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-a6a7e6c9aac02ca46f4facf6214196574423185f77caa26262f1437f6a20c90077818884d9986e3d0f27b54a1a486bcf5a99bc84f07796dba03caadd2e6f14fd"' :
                                        'id="xs-injectables-links-module-PrismaModule-a6a7e6c9aac02ca46f4facf6214196574423185f77caa26262f1437f6a20c90077818884d9986e3d0f27b54a1a486bcf5a99bc84f07796dba03caadd2e6f14fd"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-72a8740dc683b4700d534e006b3af7d3bd05a2efdf9138268f184d0fedf8e7f672e3267da4109c767fc7ca852c8226ed73ba003495f0e2dc47bc39d23a264f0e"' : 'data-target="#xs-controllers-links-module-UserModule-72a8740dc683b4700d534e006b3af7d3bd05a2efdf9138268f184d0fedf8e7f672e3267da4109c767fc7ca852c8226ed73ba003495f0e2dc47bc39d23a264f0e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-72a8740dc683b4700d534e006b3af7d3bd05a2efdf9138268f184d0fedf8e7f672e3267da4109c767fc7ca852c8226ed73ba003495f0e2dc47bc39d23a264f0e"' :
                                            'id="xs-controllers-links-module-UserModule-72a8740dc683b4700d534e006b3af7d3bd05a2efdf9138268f184d0fedf8e7f672e3267da4109c767fc7ca852c8226ed73ba003495f0e2dc47bc39d23a264f0e"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-72a8740dc683b4700d534e006b3af7d3bd05a2efdf9138268f184d0fedf8e7f672e3267da4109c767fc7ca852c8226ed73ba003495f0e2dc47bc39d23a264f0e"' : 'data-target="#xs-injectables-links-module-UserModule-72a8740dc683b4700d534e006b3af7d3bd05a2efdf9138268f184d0fedf8e7f672e3267da4109c767fc7ca852c8226ed73ba003495f0e2dc47bc39d23a264f0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-72a8740dc683b4700d534e006b3af7d3bd05a2efdf9138268f184d0fedf8e7f672e3267da4109c767fc7ca852c8226ed73ba003495f0e2dc47bc39d23a264f0e"' :
                                        'id="xs-injectables-links-module-UserModule-72a8740dc683b4700d534e006b3af7d3bd05a2efdf9138268f184d0fedf8e7f672e3267da4109c767fc7ca852c8226ed73ba003495f0e2dc47bc39d23a264f0e"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AcessDeniedResponse.html" data-type="entity-link" >AcessDeniedResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddAndRemoveParticipantDto.html" data-type="entity-link" >AddAndRemoveParticipantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddParticipantDto.html" data-type="entity-link" >AddParticipantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEventDto.html" data-type="entity-link" >CreateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEventResponseDto.html" data-type="entity-link" >CreateEventResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventChatDto.html" data-type="entity-link" >EventChatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventDto.html" data-type="entity-link" >EventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEventByIdDto.html" data-type="entity-link" >GetEventByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetMessageInput.html" data-type="entity-link" >GetMessageInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageResolver.html" data-type="entity-link" >MessageResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveParticipantDto.html" data-type="entity-link" >RemoveParticipantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RtGuard.html" data-type="entity-link" >RtGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveMessageInput.html" data-type="entity-link" >SaveMessageInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInRequestDto.html" data-type="entity-link" >SignInRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUpDto.html" data-type="entity-link" >SignUpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenDto.html" data-type="entity-link" >TokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenDtoWithUserId.html" data-type="entity-link" >TokenDtoWithUserId</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnAuthorizedResponse.html" data-type="entity-link" >UnAuthorizedResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserFromJwtDto.html" data-type="entity-link" >UserFromJwtDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRespondDto.html" data-type="entity-link" >UserRespondDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserUpdateProfileDto.html" data-type="entity-link" >UserUpdateProfileDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/GoogleOauthGuard.html" data-type="entity-link" >GoogleOauthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuardGraphql.html" data-type="entity-link" >JwtAuthGuardGraphql</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ArgonHashPayload.html" data-type="entity-link" >ArgonHashPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthKey.html" data-type="entity-link" >AuthKey</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CacheDatabaseConfig.html" data-type="entity-link" >CacheDatabaseConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/envConfig.html" data-type="entity-link" >envConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddParticipantArgs.html" data-type="entity-link" >IAddParticipantArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICreateEventArgs.html" data-type="entity-link" >ICreateEventArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISendMessageToChatArgs.html" data-type="entity-link" >ISendMessageToChatArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUpdateProfileParamsArgs.html" data-type="entity-link" >IUpdateProfileParamsArgs</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayloadForSign.html" data-type="entity-link" >JwtPayloadForSign</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayloadWithRt.html" data-type="entity-link" >JwtPayloadWithRt</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QueueDatabaseConfig.html" data-type="entity-link" >QueueDatabaseConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendMessageToChatDto.html" data-type="entity-link" >SendMessageToChatDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TripleDesDecryptPayload.html" data-type="entity-link" >TripleDesDecryptPayload</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});