exports.id=53,exports.ids=[53],exports.modules={884:(e,t,n)=>{n.r(t),n.d(t,{GitKrakenProvider:()=>GitKrakenProvider});var a=n(1220),i=n(8336),o=n(4342),r=n(7005),s=n(5419),d=n(5848),u=n(2906),c=n(5167),l=Object.defineProperty,m=Object.getOwnPropertyDescriptor;let p={id:"gitkraken",name:"GitKraken AI (Preview)"};let GitKrakenProvider=class GitKrakenProvider extends u.G{id=p.id;name=p.name;config={};_disposable;_promptTemplates=new d.o({createTTL:432e5,expireOnError:!0});constructor(e,t){super(e,t),this._disposable=this.container.subscription.onDidChange(()=>this._promptTemplates.clear())}dispose(){this._disposable.dispose()}async getModels(){let e=(0,s.dQ)();try{let e=this.container.urls.getGkAIApiUrl("providers/message-prompt"),t=await (0,a.hd)(e,{headers:await this.connection.getGkHeaders(void 0,void 0,{Accept:"application/json"})});if(!t.ok)throw Error(`Getting models (${e}) failed: ${t.status} (${t.statusText})`);let n=await t.json();if(null!=n.error)throw Error(`Getting models (${e}) failed: ${String(n.error)}`);return n.data.map(e=>({id:e.modelId,name:e.modelName,maxTokens:{input:e.maxInputTokens,output:e.maxOutputTokens},provider:p,default:e.preferred,temperature:null}))}catch(t){t instanceof i.WT||r.Vy.error(t,e,"Unable to get models")}return[]}async getPromptTemplate(e,t){let n=(0,s.dQ)();try{return await this._promptTemplates.get(e,async()=>{let t=this.container.urls.getGkAIApiUrl(`templates/message-prompt/${e}`),n=await (0,a.hd)(t,{headers:await this.connection.getGkHeaders(void 0,void 0,{Accept:"application/json"})});if(!n.ok)throw Error(`Getting prompt template (${t}) failed: ${n.status} (${n.statusText})`);let i=await n.json();if(null!=i.error)throw Error(`Getting prompt template (${t}) failed: ${String(i.error)}`);return{id:i.data.id,name:(0,c.u5)(e),template:i.data.template,variables:i.data.variables}})}catch(t){t instanceof i.WT||r.Vy.error(t,n,`Unable to get prompt template for '${e}'`)}return super.getPromptTemplate(e,t)}getApiKey(){return Promise.resolve("")}getUrl(e){return this.container.urls.getGkAIApiUrl("chat/completions")}getHeaders(e,t,n,a){return this.connection.getGkHeaders(void 0,void 0,{Accept:"application/json","GK-Action":e})}};((e,t,n,a)=>{for(var i,o=m(t,n),r=e.length-1;r>=0;r--)(i=e[r])&&(o=(a?i(t,n,o):i(o))||o);return a&&o&&l(t,n,o)})([(0,o.Yz)()],GitKrakenProvider.prototype,"getModels",1)},2012:(e,t,n)=>{n.r(t),n.d(t,{DeepSeekProvider:()=>DeepSeekProvider});var a=n(2906);let i={id:"deepseek",name:"DeepSeek"},o=[{id:"deepseek-chat",name:"DeepSeek-V3",maxTokens:{input:65536,output:8192},provider:i,default:!0,temperature:0},{id:"deepseek-reasoner",name:"DeepSeek-R1",maxTokens:{input:65536,output:8192},provider:i,temperature:0}];let DeepSeekProvider=class DeepSeekProvider extends a.G{id=i.id;name=i.name;config={keyUrl:"https://platform.deepseek.com/api_keys",keyValidator:/(?:sk-)?[a-zA-Z0-9]{32,}/};getModels(){return Promise.resolve(o)}getUrl(e){return"https://api.deepseek.com/v1/chat/completions"}}},2241:(e,t,n)=>{n.r(t),n.d(t,{GeminiProvider:()=>GeminiProvider});var a=n(2906);let i={id:"gemini",name:"Google"},o=[{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash",maxTokens:{input:1048576,output:8192},provider:i,default:!0},{id:"gemini-2.0-flash-001",name:"Gemini 2.0 Flash",maxTokens:{input:1048576,output:8192},provider:i,hidden:!0},{id:"gemini-2.0-flash-lite",name:"Gemini 2.0 Flash-Lite",maxTokens:{input:1048576,output:8192},provider:i},{id:"gemini-2.0-flash-lite-001",name:"Gemini 2.0 Flash-Lite",maxTokens:{input:1048576,output:8192},provider:i,hidden:!0},{id:"gemini-2.0-flash-lite-preview-02-05",name:"Gemini 2.0 Flash-Lite (Preview)",maxTokens:{input:1048576,output:8192},provider:i,hidden:!0},{id:"gemini-2.0-pro-exp-02-05",name:"Gemini 2.0 Pro (Experimental)",maxTokens:{input:2097152,output:8192},provider:i},{id:"gemini-2.0-flash-thinking-exp-01-21",name:"Gemini 2.0 Flash Thinking (Experimental)",maxTokens:{input:1048576,output:8192},provider:i},{id:"gemini-2.0-flash-exp",name:"Gemini 2.0 Flash (Experimental)",maxTokens:{input:1048576,output:8192},provider:i},{id:"gemini-exp-1206",name:"Gemini Experimental 1206",maxTokens:{input:2097152,output:8192},provider:i,hidden:!0},{id:"gemini-exp-1121",name:"Gemini Experimental 1121",maxTokens:{input:2097152,output:8192},provider:i,hidden:!0},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro",maxTokens:{input:2097152,output:8192},provider:i},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash",maxTokens:{input:1048576,output:8192},provider:i},{id:"gemini-1.5-flash-8b",name:"Gemini 1.5 Flash 8B",maxTokens:{input:1048576,output:8192},provider:i}];let GeminiProvider=class GeminiProvider extends a.G{id=i.id;name=i.name;config={keyUrl:"https://aistudio.google.com/app/apikey"};getModels(){return Promise.resolve(o)}getUrl(e){return"https://generativelanguage.googleapis.com/v1beta/chat/completions"}fetchCore(e,t,n,a,i){if("max_completion_tokens"in a){let{max_completion_tokens:e,...t}=a;a=e?{max_tokens:e,...t}:t}return super.fetchCore(e,t,n,a,i)}}},2724:(e,t,n)=>{n.r(t),n.d(t,{HuggingFaceProvider:()=>HuggingFaceProvider});var a=n(1220),i=n(2906);let o={id:"huggingface",name:"Hugging Face"};let HuggingFaceProvider=class HuggingFaceProvider extends i.G{id=o.id;name=o.name;config={keyUrl:"https://huggingface.co/settings/tokens",keyValidator:/(?:hf_)?[a-zA-Z0-9]{32,}/};async getModels(){let e=new URLSearchParams({filter:"text-generation,conversational",inference:"warm",sort:"trendingScore",limit:"30"}),t=await (0,a.hd)(`https://huggingface.co/api/models?${e.toString()}`,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"GET"});return(await t.json()).map(e=>({id:e.id,name:e.id.split("/").pop(),maxTokens:{input:4096,output:4096},provider:o,temperature:null}))}getUrl(e){return`https://api-inference.huggingface.co/models/${e.id}/v1/chat/completions`}}},2906:(e,t,n)=>{n.d(t,{G:()=>OpenAICompatibleProvider});var a=n(1220),i=n(8336),o=n(7747),r=n(7005),s=n(5419),d=n(5167),u=n(9549),c=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),l=e=>{throw TypeError(e)},m=(e,t,n)=>{if(null!=t){var a,i;"object"!=typeof t&&"function"!=typeof t&&l("Object expected"),n&&(a=t[c("asyncDispose")]),void 0===a&&(a=t[c("dispose")],n&&(i=a)),"function"!=typeof a&&l("Object not disposable"),i&&(a=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.push([n,a,t])}else n&&e.push([n]);return t},p=(e,t,n)=>{var a="function"==typeof SuppressedError?SuppressedError:function(e,t,n,a){return(a=Error(n)).name="SuppressedError",a.error=e,a.suppressed=t,a},i=e=>t=n?new a(e,t,"An error was suppressed during disposal"):(n=!0,e),o=a=>{for(;a=e.pop();)try{var r=a[1]&&a[1].call(a[2]);if(a[0])return Promise.resolve(r).then(o,e=>(i(e),o()))}catch(e){i(e)}if(n)throw t};return o()};let OpenAICompatibleProvider=class OpenAICompatibleProvider{constructor(e,t){this.container=e,this.connection=t}dispose(){}async getPromptTemplate(e,t){return Promise.resolve((0,u.W)(e,t))}async getApiKey(){let{keyUrl:e,keyValidator:t}=this.config;return(0,d.Hi)(this.container.storage,{id:this.id,name:this.name,validator:null!=t?e=>t.test(e):()=>!0,url:e})}getHeaders(e,t,n,a){return{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${a}`}}async sendRequest(e,t,n,a,i){var c=[];try{let l=m(c,(0,s.bP)(`${(0,r.zu)(this)}.sendRequest`,!1)),p=await this.getApiKey();if(null==p)return;let h=await this.getPromptTemplate(e,n);if(null==h){r.Vy.error(void 0,l,`Unable to find prompt template for '${e}'`);return}try{let r=!1,[s,c]=await this.fetch(e,n,p,(n,i)=>{let s;({content:s,truncated:r}=(0,u.J)(e,h,t,n));let d=[{role:"user",content:s}];return a["retry.count"]=i,a["input.length"]=(a["input.length"]??0)+(0,o.cz)(d,e=>e.content.length),d},i?.outputTokens??4096,i?.cancellation);return r&&(0,d.kB)(c,n),s}catch(e){throw r.Vy.error(e,l,`Unable to ${h.name}: (${n.provider.name})`),Error(`Unable to ${h.name}: (${n.provider.name}) ${e.message}`)}}catch(e){var l=e,h=!0}finally{p(c,l,h)}}async fetch(e,t,n,a,i,o){let r=0,s=(0,d.pn)(t,2600);for(;;){let u={model:t.id,messages:a(s,r),stream:!1,max_completion_tokens:Math.min(i,t.maxTokens.output),temperature:(0,d.dj)(t.temperature)},c=await this.fetchCore(e,t,n,u,o);if(!c.ok){let n=await this.handleFetchFailure(c,e,t,r,s);if(n.retry){s=n.maxCodeCharacters,r++;continue}}let l=await c.json();return[{id:l.id,content:l.choices?.[0].message.content?.trim()??l.content?.[0]?.text?.trim()??"",usage:{promptTokens:l.usage?.prompt_tokens??l.usage?.input_tokens,completionTokens:l.usage?.completion_tokens??l.usage?.output_tokens,totalTokens:l.usage?.total_tokens,limits:l?.usage?.gk!=null?{used:l.usage.gk.used,limit:l.usage.gk.limit,resetsOn:new Date(l.usage.gk.resets_on)}:void 0}},s]}}async handleFetchFailure(e,t,n,a,i){let o;if(404===e.status)throw Error(`Your API key doesn't seem to have access to the selected '${n.id}' model`);if(429===e.status)throw Error(`(${this.name}) ${e.status}: Too many requests (rate limit exceeded) or your account is out of funds`);try{o=await e.json()}catch{}if(a<2&&o?.error?.code==="context_length_exceeded")return{retry:!0,maxCodeCharacters:i-500};throw Error(`(${this.name}) ${e.status}: ${o?.error?.message||e.statusText}`)}async fetchCore(e,t,n,o,r){let s;null!=r&&(s=new AbortController,r.onCancellationRequested(()=>s?.abort()));let d=this.getUrl(t);try{return await (0,a.hd)(d,{headers:await this.getHeaders(e,t,d,n),method:"POST",body:JSON.stringify(o),signal:s?.signal})}catch(e){if("AbortError"===e.name)throw new i.AL(e);throw e}}}},3215:(e,t,n)=>{n.r(t),n.d(t,{GitHubModelsProvider:()=>GitHubModelsProvider});var a=n(1220),i=n(2906),o=n(5167);let r={id:"github",name:"GitHub Models"};let GitHubModelsProvider=class GitHubModelsProvider extends i.G{id=r.id;name=r.name;config={keyUrl:"https://github.com/settings/tokens",keyValidator:/(?:ghp-)?[a-zA-Z0-9]{32,}/};async getModels(){let e=await (0,a.hd)("https://github.com/marketplace?category=All&task=chat-completion&type=models",{headers:{Accept:"application/json","Content-Type":"application/json"}});return(await e.json()).results.map(e=>({id:e.name,name:e.friendly_name,maxTokens:{input:e.max_input_tokens,output:e.max_output_tokens},provider:r,temperature:null}))}getUrl(e){return"https://models.inference.ai.azure.com/chat/completions"}async handleFetchFailure(e,t,n,a,i){if(404!==e.status&&429!==e.status){let t;try{t=await e.json()}catch{}if(a<2&&t?.error?.code==="tokens_limit_reached"){let e=/Max size: (\d+) tokens/.exec(t?.error?.message);if(e?.[1]!=null)return{retry:!0,maxCodeCharacters:i=(0,o.pn)(n,2600,parseInt(e[1],10))}}}return super.handleFetchFailure(e,t,n,a,i)}}},4254:(e,t,n)=>{n.r(t),n.d(t,{AnthropicProvider:()=>AnthropicProvider});var a=n(2906);let i={id:"anthropic",name:"Anthropic"},o=[{id:"claude-3-7-sonnet-latest",name:"Claude 3.7 Sonnet",maxTokens:{input:204800,output:8192},provider:i},{id:"claude-3-7-sonnet-20250219",name:"Claude 3.7 Sonnet",maxTokens:{input:204800,output:8192},provider:i,hidden:!0},{id:"claude-3-5-sonnet-latest",name:"Claude 3.5 Sonnet",maxTokens:{input:204800,output:8192},provider:i},{id:"claude-3-5-sonnet-20241022",name:"Claude 3.5 Sonnet",maxTokens:{input:204800,output:8192},provider:i,hidden:!0},{id:"claude-3-5-sonnet-20240620",name:"Claude 3.5 Sonnet",maxTokens:{input:204800,output:8192},provider:i,hidden:!0},{id:"claude-3-5-haiku-latest",name:"Claude 3.5 Haiku",maxTokens:{input:204800,output:8192},provider:i,default:!0},{id:"claude-3-5-haiku-20241022",name:"Claude 3.5 Haiku",maxTokens:{input:204800,output:8192},provider:i,hidden:!0},{id:"claude-3-opus-latest",name:"Claude 3 Opus",maxTokens:{input:204800,output:4096},provider:i},{id:"claude-3-opus-20240229",name:"Claude 3 Opus",maxTokens:{input:204800,output:4096},provider:i,hidden:!0},{id:"claude-3-sonnet-latest",name:"Claude 3 Sonnet",maxTokens:{input:204800,output:4096},provider:i,hidden:!0},{id:"claude-3-sonnet-20240229",name:"Claude 3 Sonnet",maxTokens:{input:204800,output:4096},provider:i,hidden:!0},{id:"claude-3-haiku-latest",name:"Claude 3 Haiku",maxTokens:{input:204800,output:4096},provider:i},{id:"claude-3-haiku-20240307",name:"Claude 3 Haiku",maxTokens:{input:204800,output:4096},provider:i,hidden:!0},{id:"claude-2.1",name:"Claude 2.1",maxTokens:{input:204800,output:4096},provider:i,hidden:!0}];let AnthropicProvider=class AnthropicProvider extends a.G{id=i.id;name=i.name;config={keyUrl:"https://console.anthropic.com/account/keys",keyValidator:/(?:sk-)?[a-zA-Z0-9-_]{32,}/};getModels(){return Promise.resolve(o)}getUrl(e){return"https://api.anthropic.com/v1/messages"}getHeaders(e,t,n,a){return{Accept:"application/json","Content-Type":"application/json",Authorization:`Bearer ${a}`,"x-api-key":a,"anthropic-version":"2023-06-01"}}fetchCore(e,t,n,a,i){if("max_completion_tokens"in a){let{max_completion_tokens:e,...t}=a;a=e?{max_tokens:e,...t}:t}return super.fetchCore(e,t,n,a,i)}async handleFetchFailure(e,t,n,a,i){let o;if(404===e.status)throw Error(`Your API key doesn't seem to have access to the selected '${n.id}' model`);if(429===e.status)throw Error(`(${this.name}) ${e.status}: Too many requests (rate limit exceeded) or your account is out of funds`);try{o=await e.json()}catch{}if(a++<2&&o?.error?.type==="invalid_request_error"&&o?.error?.message?.includes("prompt is too long"))return{retry:!0,maxCodeCharacters:i-500*a};throw Error(`(${this.name}) ${e.status}: ${o?.error?.message||e.statusText})`)}}},4912:(e,t,n)=>{n.r(t),n.d(t,{XAIProvider:()=>XAIProvider});var a=n(2906);let i={id:"xai",name:"xAI"},o=[{id:"grok-beta",name:"Grok Beta",maxTokens:{input:131072,output:4096},provider:i,default:!0}];let XAIProvider=class XAIProvider extends a.G{id=i.id;name=i.name;config={keyUrl:"https://console.x.ai/",keyValidator:/(?:xai-)?[a-zA-Z0-9]{32,}/};getModels(){return Promise.resolve(o)}getUrl(e){return"https://api.x.ai/v1/chat/completions"}}},5167:(e,t,n)=>{n.d(t,{Hi:()=>u,dj:()=>c,kB:()=>l,pn:()=>d,u5:()=>s});var a=n(1398),i=n(1078),o=n(4941),r=n(3934);function s(e){switch(e){case"generate-commitMessage":return"Generate Commit Message";case"generate-stashMessage":return"Generate Stash Message";case"generate-changelog":return"Generate Changelog";case"generate-create-cloudPatch":return"Create Cloud Patch Details";case"generate-create-codeSuggestion":return"Create Code Suggestion Details";case"explain-changes":return"Explain Changes";default:return"Unknown Action"}}function d(e,t,n){let a=(n??e.maxTokens.input)*3.1-t/3.1;return Math.floor(a-.1*a)}async function u(e,t){let n=await e.getSecret(`gitlens.${t.id}.key`);if(!n){let i=a.window.createInputBox();i.ignoreFocusOut=!0;let o=[];try{let e={iconPath:new a.ThemeIcon("link-external"),tooltip:`Open the ${t.name} API Key Page`};n=await new Promise(n=>{o.push(i.onDidHide(()=>n(void 0)),i.onDidChangeValue(e=>{if(e&&!t.validator(e)){i.validationMessage=`Please enter a valid ${t.name} API key`;return}i.validationMessage=void 0}),i.onDidAccept(()=>{let e=i.value.trim();if(!e||!t.validator(e)){i.validationMessage=`Please enter a valid ${t.name} API key`;return}n(e)}),i.onDidTriggerButton(n=>{n===e&&t.url&&a.env.openExternal(a.Uri.parse(t.url))})),i.password=!0,i.title=`Connect to ${t.name}`,i.placeholder=`Please enter your ${t.name} API key to use this feature`,i.prompt=`Enter your [${t.name} API Key](${t.url} "Get your ${t.name} API key")`,t.url&&(i.buttons=[e]),i.show()})}finally{i.dispose(),o.forEach(e=>void e.dispose())}if(!n)return;e.storeSecret(`gitlens.${t.id}.key`,n).catch()}return n}function c(e){if(null!==e)return null!=e?e:Math.max(0,Math.min(i.H.get("ai.modelOptions.temperature"),2))}function l(e,t){a.window.showWarningMessage(`The diff of the changes had to be truncated to ${(0,o.bH)(e)} characters to fit within the ${(0,r.Lu)(t.provider.name)} limits.`)}},6560:(e,t,n)=>{n.r(t),n.d(t,{VSCodeAIProvider:()=>VSCodeAIProvider});var a=n(1398),i=n(7747),o=n(7005),r=n(5419),s=n(3934),d=n(5167),u=n(9549),c=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),l=e=>{throw TypeError(e)},m=(e,t,n)=>{if(null!=t){var a,i;"object"!=typeof t&&"function"!=typeof t&&l("Object expected"),n&&(a=t[c("asyncDispose")]),void 0===a&&(a=t[c("dispose")],n&&(i=a)),"function"!=typeof a&&l("Object not disposable"),i&&(a=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.push([n,a,t])}else n&&e.push([n]);return t},p=(e,t,n)=>{var a="function"==typeof SuppressedError?SuppressedError:function(e,t,n,a){return(a=Error(n)).name="SuppressedError",a.error=e,a.suppressed=t,a},i=e=>t=n?new a(e,t,"An error was suppressed during disposal"):(n=!0,e),o=a=>{for(;a=e.pop();)try{var r=a[1]&&a[1].call(a[2]);if(a[0])return Promise.resolve(r).then(o,e=>(i(e),o()))}catch(e){i(e)}if(n)throw t};return o()};let h={id:"vscode",name:"VS Code Provided"};let VSCodeAIProvider=class VSCodeAIProvider{constructor(e,t){this.container=e,this.connection=t,this._disposable=a.Disposable.from(this._onDidChange,a.lm.onDidChangeChatModels(()=>this._onDidChange.fire()))}id=h.id;_name;get name(){return this._name??h.name}_onDidChange=new a.EventEmitter;get onDidChange(){return this._onDidChange.event}_disposable;dispose(){this._disposable.dispose()}async getModels(){return(await a.lm.selectChatModels()).map(g)}async getPromptTemplate(e,t){return Promise.resolve((0,u.W)(e,t))}async getChatModel(e){let t=await a.lm.selectChatModels(e.selector);return t?.[0]}async sendRequest(e,t,n,s,c){var l=[];try{let p,h;let g=m(l,(0,r.bP)(`${(0,o.zu)(this)}.sendRequest`,!1)),f=await this.getChatModel(n);if(null==f)return;p=c?.cancellation==null?(h=new a.CancellationTokenSource).token:c.cancellation;let y=await this.getPromptTemplate(e,n);if(null==y){o.Vy.error(void 0,g,`Unable to find prompt template for '${e}'`);return}let v=0,k=(0,d.pn)(n,2600)-1e3;try{let r=!1;for(;;){let c;({content:c,truncated:r}=(0,u.J)(e,y,t,k));let l=[a.LanguageModelChatMessage.User(c)];s["retry.count"]=v,s["input.length"]=(s["input.length"]??0)+(0,i.cz)(l,e=>e.content.length);try{let e=await f.sendRequest(l,{justification:"GitLens leverages Copilot for AI-powered features to improve your workflow and development experience.",modelOptions:{temperature:(0,d.dj)(n.temperature)}},p);r&&(0,d.kB)(k,n);let t="";for await(let n of e.text)t+=n;return{content:t.trim()}}catch(t){let e=t instanceof Error?t.message:String(t);if(t instanceof Error&&"code"in t&&"NoPermissions"===t.code)throw o.Vy.error(t,g,`User denied access to ${n.provider.name}`),Error(`User denied access to ${n.provider.name}`);if(t instanceof Error&&"cause"in t&&t.cause instanceof Error&&(e+=`
${t.cause.message}`,v++<2&&t.cause.message.includes("exceeds token limit"))){k-=500*v;continue}throw o.Vy.error(t,g,`Unable to ${y.name}: (${n.provider.name})`),Error(`Unable to ${y.name}: (${n.provider.name}${t.code?`:${t.code}`:""}) ${e}`)}}}finally{h?.dispose()}}catch(e){var h=e,g=!0}finally{p(l,h,g)}}};function g(e){return{id:`${e.vendor}:${e.family}`,name:`${(0,s.ZH)(e.vendor)} ${e.name}`,vendor:e.vendor,selector:{vendor:e.vendor,family:e.family},maxTokens:{input:e.maxInputTokens,output:4096},provider:{id:h.id,name:(0,s.ZH)(e.vendor)}}}},6940:(e,t,n)=>{n.r(t),n.d(t,{OpenAIProvider:()=>OpenAIProvider});var a=n(1078),i=n(2906);let o={id:"openai",name:"OpenAI"},r=[{id:"o3-mini",name:"o3 mini",maxTokens:{input:2e5,output:1e5},provider:o,temperature:null},{id:"o3-mini-2025-01-31",name:"o3 mini",maxTokens:{input:2e5,output:1e5},provider:o,temperature:null,hidden:!0},{id:"o1",name:"o1",maxTokens:{input:2e5,output:1e5},provider:o,temperature:null},{id:"o1-2024-12-17",name:"o1",maxTokens:{input:2e5,output:1e5},provider:o,temperature:null,hidden:!0},{id:"o1-preview",name:"o1 preview",maxTokens:{input:128e3,output:32768},provider:o,temperature:null,hidden:!0},{id:"o1-preview-2024-09-12",name:"o1 preview",maxTokens:{input:128e3,output:32768},provider:o,temperature:null,hidden:!0},{id:"o1-mini",name:"o1 mini",maxTokens:{input:128e3,output:65536},provider:o,temperature:null},{id:"o1-mini-2024-09-12",name:"o1 mini",maxTokens:{input:128e3,output:65536},provider:o,temperature:null,hidden:!0},{id:"gpt-4o",name:"GPT-4o",maxTokens:{input:128e3,output:16384},provider:o,default:!0},{id:"gpt-4o-2024-11-20",name:"GPT-4o",maxTokens:{input:128e3,output:16384},provider:o,hidden:!0},{id:"gpt-4o-2024-08-06",name:"GPT-4o",maxTokens:{input:128e3,output:16384},provider:o,hidden:!0},{id:"gpt-4o-2024-05-13",name:"GPT-4o",maxTokens:{input:128e3,output:4096},provider:o,hidden:!0},{id:"chatgpt-4o-latest",name:"GPT-4o",maxTokens:{input:128e3,output:16384},provider:o,hidden:!0},{id:"gpt-4o-mini",name:"GPT-4o mini",maxTokens:{input:128e3,output:16384},provider:o},{id:"gpt-4o-mini-2024-07-18",name:"GPT-4o mini",maxTokens:{input:128e3,output:16384},provider:o,hidden:!0},{id:"gpt-4-turbo",name:"GPT-4 Turbo",maxTokens:{input:128e3,output:4096},provider:o,hidden:!0},{id:"gpt-4-turbo-2024-04-09",name:"GPT-4 Turbo preview (2024-04-09)",maxTokens:{input:128e3,output:4096},provider:o,hidden:!0},{id:"gpt-4-turbo-preview",name:"GPT-4 Turbo preview",maxTokens:{input:128e3,output:4096},provider:o,hidden:!0},{id:"gpt-4-0125-preview",name:"GPT-4 0125 preview",maxTokens:{input:128e3,output:4096},provider:o,hidden:!0},{id:"gpt-4-1106-preview",name:"GPT-4 1106 preview",maxTokens:{input:128e3,output:4096},provider:o,hidden:!0},{id:"gpt-4",name:"GPT-4",maxTokens:{input:8192,output:4096},provider:o,hidden:!0},{id:"gpt-4-0613",name:"GPT-4 0613",maxTokens:{input:8192,output:4096},provider:o,hidden:!0},{id:"gpt-4-32k",name:"GPT-4 32k",maxTokens:{input:32768,output:4096},provider:o,hidden:!0},{id:"gpt-4-32k-0613",name:"GPT-4 32k 0613",maxTokens:{input:32768,output:4096},provider:o,hidden:!0},{id:"gpt-3.5-turbo",name:"GPT-3.5 Turbo",maxTokens:{input:16385,output:4096},provider:o,hidden:!0},{id:"gpt-3.5-turbo-0125",name:"GPT-3.5 Turbo 0125",maxTokens:{input:16385,output:4096},provider:o,hidden:!0},{id:"gpt-3.5-turbo-1106",name:"GPT-3.5 Turbo 1106",maxTokens:{input:16385,output:4096},provider:o,hidden:!0},{id:"gpt-3.5-turbo-16k",name:"GPT-3.5 Turbo 16k",maxTokens:{input:16385,output:4096},provider:o,hidden:!0}];let OpenAIProvider=class OpenAIProvider extends i.G{id=o.id;name=o.name;config={keyUrl:"https://platform.openai.com/account/api-keys",keyValidator:/(?:sk-)?[a-zA-Z0-9]{32,}/};getModels(){return Promise.resolve(r)}getUrl(e){return a.H.get("ai.openai.url")||"https://api.openai.com/v1/chat/completions"}getHeaders(e,t,n,a){return n.includes(".azure.com")?{Accept:"application/json","Content-Type":"application/json","api-key":a}:super.getHeaders(e,t,n,a)}}},9549:(e,t,n)=>{n.d(t,{W:()=>l,J:()=>p});var a=n(7747),i=n(3934);let o=`You are an advanced AI programming assistant and are tasked with summarizing code changes into a concise but meaningful commit message. You will be provided with a code diff and optional additional context. Your goal is to analyze the changes and create a clear, informative commit message that accurately represents the modifications made to the code.

First, examine the following code changes provided in Git diff format:
<~~diff~~>
\${diff}
</~~diff~~>

Now, if provided, use this context to understand the motivation behind the changes and any relevant background information:
<~~additional-context~~>
\${context}
</~~additional-context~~>

To create an effective commit message, follow these steps:

1. Carefully analyze the diff and context, focusing on:
   - The purpose and rationale of the changes
   - Any problems addressed or benefits introduced
   - Any significant logic changes or algorithmic improvements
2. Ensure the following when composing the commit message:
   - Emphasize the 'why' of the change, its benefits, or the problem it addresses
   - Use an informal yet professional tone
   - Use a future-oriented manner, third-person singular present tense (e.g., 'Fixes', 'Updates', 'Improves', 'Adds', 'Removes')
   - Be clear and concise
   - Synthesize only meaningful information from the diff and context
   - Avoid outputting code, specific code identifiers, names, or file names unless crucial for understanding
   - Avoid repeating information, broad generalities, and unnecessary phrases like "this", "this commit", or "this change"
3. Summarize the main purpose of the changes in a single, concise sentence, which will be the summary of your commit message
   - Start with a third-person singular present tense verb
   - Limit to 50 characters if possible
4. If necessary, provide a brief explanation of the changes, which will be the body of your commit message
   - Add line breaks for readability and to separate independent ideas
   - Focus on the "why" rather than the "what" of the changes.
5. If the changes are related to a specific issue or ticket, include the reference (e.g., "Fixes #123" or "Relates to JIRA-456") at the end of the commit message.

Don't over explain and write your commit message summary inside <summary> tags and your commit message body inside <body> tags and include no other text:

<summary>
Implements user authentication feature
</summary>
<body>
Adds login and registration endpoints
Updates user model to include password hashing
Integrates JWT for secure token generation

Fixes #789
</body>

\${instructions}

Based on the provided code diff and any additional context, create a concise but meaningful commit message following the instructions above.`,r=`You are an advanced AI programming assistant and are tasked with creating a concise but descriptive stash message. You will be provided with a code diff of uncommitted changes. Your goal is to analyze the changes and create a clear, single-line stash message that accurately represents the work in progress being stashed.

First, examine the following code changes provided in Git diff format:
<~~diff~~>
\${diff}
</~~diff~~>

To create an effective stash message, follow these steps:

1. Analyze the changes and focus on:
   - The primary feature or bug fix was being worked on
   - The overall intent of the changes
   - Any notable file or areas being modified
2. Create a single-line message that:
   - Briefly describes the changes being stashed but must be descriptive enough to identify later
   - Prioritizes the most significant change if multiple changes are present. If multiple related changes are significant, try to summarize them concisely
   - Use a future-oriented manner, third-person singular present tense (e.g., 'Fixes', 'Updates', 'Improves', 'Adds', 'Removes')

Write your stash message inside <summary> tags and include no other text:

<summary>
Adds new awesome feature
</summary>

\${instructions}

Based on the provided code diff, create a concise but descriptive stash message following the instructions above.`,s=`You are an advanced AI programming assistant and are tasked with summarizing code changes into a concise and meaningful title and description. You will be provided with a code diff and optional additional context. Your goal is to analyze the changes and create a clear, informative title and description that accurately represents the modifications made to the code.

First, examine the following code changes provided in Git diff format:
<~~diff~~>
\${diff}
</~~diff~~>

Now, if provided, use this context to understand the motivation behind the changes and any relevant background information:
<~~additional-context~~>
\${context}
</~~additional-context~~>

To create an effective title and description, follow these steps:

1. Carefully analyze the diff and context, focusing on:
   - The purpose and rationale of the changes
   - Any problems addressed or benefits introduced
   - Any significant logic changes or algorithmic improvements
2. Ensure the following when composing the title and description:
   - Emphasize the 'why' of the change, its benefits, or the problem it addresses
   - Use an informal yet professional tone
   - Use a future-oriented manner, third-person singular present tense (e.g., 'Fixes', 'Updates', 'Improves', 'Adds', 'Removes')
   - Be clear and concise
   - Synthesize only meaningful information from the diff and context
   - Avoid outputting code, specific code identifiers, names, or file names unless crucial for understanding
   - Avoid repeating information, broad generalities, and unnecessary phrases like "this", "this commit", or "this change"
3. Summarize the main purpose of the changes in a single, concise sentence, which will be the title.
4. If necessary, provide a brief explanation of the changes, which will be the description.
   - Add line breaks for readability and to separate independent ideas
   - Focus on the "why" rather than the "what" of the changes.

Write your title inside <summary> tags and your description inside <body> tags and include no other text:

<summary>
Implements user authentication feature
</summary>
<body>
Adds login and registration endpoints
Updates user model to include password hashing
Integrates JWT for secure token generation
</body>

\${instructions}

Based on the provided code diff and any additional context, create a concise but meaningful title and description following the instructions above.`,d=`You are an advanced AI programming assistant and are tasked with summarizing code changes into a concise and meaningful code review title and description. You will be provided with a code diff and optional additional context. Your goal is to analyze the changes and create a clear, informative code review title and description that accurately represents the modifications made to the code.

First, examine the following code changes provided in Git diff format:
<~~diff~~>
\${diff}
</~~diff~~>

Now, if provided, use this context to understand the motivation behind the changes and any relevant background information:
<~~additional-context~~>
\${context}
</~~additional-context~~>

To create an effective title and description, follow these steps:

1. Carefully analyze the diff and context, focusing on:
   - The purpose and rationale of the changes
   - Any problems addressed or benefits introduced
   - Any significant logic changes or algorithmic improvements
2. Ensure the following when composing the title and description:
   - Emphasize the 'why' of the change, its benefits, or the problem it addresses
   - Use an informal yet professional tone
   - Use a future-oriented manner, third-person singular present tense (e.g., 'Fixes', 'Updates', 'Improves', 'Adds', 'Removes')
   - Be clear and concise
   - Synthesize only meaningful information from the diff and context
   - Avoid outputting code, specific code identifiers, names, or file names unless crucial for understanding
   - Avoid repeating information, broad generalities, and unnecessary phrases like "this", "this commit", or "this change"
3. Summarize the main purpose of the changes in a single, concise sentence, which will be the title.
4. If necessary, provide a brief explanation of the changes, which will be the description.
   - Add line breaks for readability and to separate independent ideas
   - Focus on the "why" rather than the "what" of the changes.

Write your title inside <summary> tags and your description inside <body> tags and include no other text:

<summary>
Implements user authentication feature
</summary>
<body>
Adds login and registration endpoints
Updates user model to include password hashing
Integrates JWT for secure token generation
</body>

\${instructions}

Based on the provided code diff and any additional context, create a concise but meaningful code review title and description following the instructions above.`,u=`You are an advanced AI programming assistant and are tasked with creating clear, technical summaries of code changes that help reviewers understand the modifications and their implications. You will analyze a code diff and the author-provided message to produce a structured summary that captures the essential aspects of the changes.

First, examine the following code changes provided in Git diff format:
<~~diff~~>
\${diff}
</~~diff~~>

Now, review the author-provided message to help understand the motivation behind the changes and any relevant background information:
<~~message~~>
\${message}
</~~message~~>

Analysis Instructions:
1. Examine the technical changes and their direct implications
2. Consider the scope of changes (small fix vs. major modification)
3. Identify any structural or behavioral changes
4. Look for potential side effects or dependencies
5. Note any obvious testing implications

Write your summary inside <summary> and <body> tags in the following structured markdown format, text in [] brackets should be replaced with your own text, if applicable, not including the brackets:

<summary>
[Concise, one-line description of the change]

[2-3 sentences explaining the core changes and their purpose]
</summary>
<body>
### Changes
- [Key technical modifications]
- [Important structural changes]
- [Modified components/files]

### Impact
- [Behavioral changes]
- [Dependencies affected]
- [Breaking changes, if any]
- [Performance implications, if apparent]
</body>

Guidelines:
- Keep the initial description under 80 characters
- Use clear, technical language
- Focus on observable changes from the diff
- Highlight significant code structure changes
- Base conclusions only on the code diff and message
- Avoid assumptions about business context
- Include specific file/component names only when relevant

\${instructions}

Based on the provided code diff and message, create a focused technical summary following the format above.`,c=`You are an expert at creating changelogs in the "Keep a Changelog" format (https://keepachangelog.com). Your task is to create a set of clear, informative changelog entries.

First, carefully examine the following JSON data containing commit messages and associated issues. The data is structured as an array of "change" objects. Each "change" contains a \`message\` (the commit message) and an \`issues\` array. The \`issues\` array contains objects representing associated issues, each with an \`id\`, \`url\`, and optional \`title\`.

<~~data~~>
\${data}
</~~data~~>

Guidelines for creating the changelog:

1. Analyze the commit messages and associated issue titles (if available) to understand the changes made. Be sure to read every commit message and associated issue titles to understand the purpose of each change.
2. Group changes into these categories (only include categories with actual changes):
   - Added: New features or capabilities
   - Changed: Changes to existing functionality
   - Deprecated: Features that will be removed in upcoming releases
   - Removed: Features that were removed
   - Fixed: Bug fixes
   - Security: Security-related changes
3. Order entries by importance within each category
4. Write a clear, concise, user-friendly descriptions for each change that focuses on the impact to users
   - Follow the example structure below of the Keep a Changelog format for each entry
   - Start with a third-person singular present tense verb (e.g., "Adds", "Changes", "Improves", "Removes", "Deprecates", "Fixes", etc.)
   - Avoid technical implementation details unless directly relevant to users
   - Combine related changes into single entries when appropriate, grouping the associated issues together as well
   - Focus on the what and why, not the how. One sentence is often sufficient, though bullets can be used for multiple related points
5. Prioritize user-facing changes. If a commit message describes internal refactoring or implementation details, try to infer the user-facing impact (if any) from the issue titles or other commits. If there's no user-facing impact, and no clear external benefit, omit the change
6. Use Markdown headings, links, and bullet points, adhering to Keep a Changelog structure
7. Provide only the changelog entry\u2014no additional text or commentary outside of the changelog

Example output structure:

### Added
- Adds brief description of the added feature ([#Issue-ID](Issue-URL))

### Changed
- Changes brief description of how something changed ([#Issue-ID](Issue-URL))
- Improves brief description of how something improved ([#Issue-ID](Issue-URL))

### Fixed
- Fixes Issue Title or brief description if no title ([#Issue-ID](Issue-URL))

\${instructions}

Based on the provided commit messages and associated issues, create a set of markdown changelog entries following the instructions above. Do not include any explanatory text or metadata`;function l(e,t){switch(e){case"generate-commitMessage":return{name:"Generate Commit Message",template:o,variables:["diff","context","instructions"]};case"generate-stashMessage":return{name:"Generate Stash Message",template:r,variables:["diff","instructions"]};case"generate-changelog":return{name:"Generate Changelog",template:c,variables:["data","instructions"]};case"generate-create-cloudPatch":return{name:"Create Cloud Patch Details",template:s,variables:["diff","context","instructions"]};case"generate-create-codeSuggestion":return{name:"Create Code Suggestion Details",template:d,variables:["diff","context","instructions"]};case"explain-changes":return{name:"Explain Changes",template:u,variables:["diff","message","instructions"]};default:return}}let m=["diff"];function p(e,t,n,o){let r=Object.entries(n).filter(([e])=>t.variables.includes(e)),s=t.template.length+(0,a.cz)(r,([,e])=>e.length),d=n,u=!1;for(let e of(s>o&&(u=!0,r=r.map(([e,n])=>{if(!m.includes(e))return[e,n];let a=o-(s-n.length);if(a>n.length)throw Error(`Unable to truncate context to fit within the ${t.name} limits`);return[e,n.substring(0,a)]})),t.variables))r.some(([t])=>t===e)||r.push([e,""]);return d=Object.fromEntries(r),{content:(0,i.GW)(t.template,d),truncated:u}}}};