"use strict";var Q=Object.defineProperty,Z=Object.defineProperties;var X=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var ee=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;var V=(i,e,t)=>e in i?Q(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,I=(i,e)=>{for(var t in e||(e={}))ee.call(e,t)&&V(i,t,e[t]);if(O)for(var t of O(e))te.call(e,t)&&V(i,t,e[t]);return i},K=(i,e)=>Z(i,X(e));var re=require("module"),ne=require("path"),ie=require("magic-string");function se(i){return i&&typeof i=="object"&&"default"in i?i:{default:i}}function ae(i){if(i&&i.__esModule)return i;var e=Object.create(null);return i&&Object.keys(i).forEach(function(t){if(t!=="default"){var n=Object.getOwnPropertyDescriptor(i,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return i[t]}})}}),e.default=i,Object.freeze(e)}var T=ae(ne),oe=se(ie),M=require;function ce(){const i=process.cwd();try{return M.resolve("typescript",{paths:[i]})}catch{throw new Error(`Could not find \`typescript\` in ${i}`)}}var r=M(ce());const $=".d.ts",R={getCurrentDirectory:()=>r.sys.getCurrentDirectory(),getNewLine:()=>r.sys.newLine,getCanonicalFileName:r.sys.useCaseSensitiveFileNames?i=>i:i=>i.toLowerCase()},le={declaration:!0,noEmit:!1,emitDeclarationOnly:!0,noEmitOnError:!0,checkJs:!1,declarationMap:!1,skipLibCheck:!0,preserveSymlinks:!0,target:r.ScriptTarget.ESNext};function q(i,e){const t=I(I({},le),e);let n=T.dirname(i),s=[];const o=r.findConfigFile(n,r.sys.fileExists);if(!o)return{dtsFiles:s,dirName:n,compilerOptions:t};n=T.dirname(o);const{config:p,error:c}=r.readConfigFile(o,r.sys.readFile);if(c)return console.error(r.formatDiagnostic(c,R)),{dtsFiles:s,dirName:n,compilerOptions:t};const{fileNames:l,options:m,errors:f}=r.parseJsonConfigFileContent(p,r.sys,n);return s=l.filter(d=>d.endsWith($)),f.length?(console.error(r.formatDiagnostics(f,R)),{dtsFiles:s,dirName:n,compilerOptions:t}):{dtsFiles:s,dirName:n,compilerOptions:I(I({},m),t)}}function pe(i,e){const{dtsFiles:t,compilerOptions:n}=q(i,e);return r.createProgram([i].concat(Array.from(t)),n,r.createCompilerHost(n,!0))}function fe(i,e){const t=[];let n=[],s=new Set,o="",p={};for(let c of i){if(c.endsWith($))continue;c=T.resolve(c);const l=q(c,e);if(l.dtsFiles.forEach(s.add,s),!n.length){n.push(c),{dirName:o,compilerOptions:p}=l;continue}if(l.dirName===o)n.push(c);else{const m=r.createCompilerHost(p,!0),f=r.createProgram(n.concat(Array.from(s)),p,m);t.push(f),n=[c],{dirName:o,compilerOptions:p}=l}}if(n.length){const c=r.createCompilerHost(p,!0),l=r.createProgram(n.concat(Array.from(s)),p,c);t.push(l)}return t}function ue(){let i;try{return{codeFrameColumns:i}=M("@babel/code-frame"),i}catch{try{return{codeFrameColumns:i}=re.createRequire(typeof document=="undefined"?new(require("url")).URL("file:"+__filename).href:document.currentScript&&document.currentScript.src||new URL("rollup-plugin-dts-2185d5de.js",document.baseURI).href)("@babel/code-frame"),i}catch{}}}function me(i){const e=i.getSourceFile(),t=e.getLineAndCharacterOfPosition(i.getStart()),n=e.getLineAndCharacterOfPosition(i.getEnd());return{start:{line:t.line+1,column:t.character+1},end:{line:n.line+1,column:n.character+1}}}function de(i){const e=ue(),n=i.getSourceFile().getFullText(),s=me(i);return e?`
`+e(n,s,{highlightCode:!0}):`
${s.start.line}:${s.start.column}: \`${i.getFullText().trim()}\``}class h extends Error{constructor(e,t="Syntax not yet supported"){super(`${t}
${de(e)}`)}}class ye{constructor(e){this.sourceFile=e}findNamespaces(){const e=[],t={};for(const n of this.sourceFile.statements){const s={start:n.getStart(),end:n.getEnd()};if(r.isEmptyStatement(n)){e.unshift({name:"",exports:[],location:s});continue}if((r.isImportDeclaration(n)||r.isExportDeclaration(n))&&n.moduleSpecifier&&r.isStringLiteral(n.moduleSpecifier)){let{text:f}=n.moduleSpecifier;if(f.startsWith(".")&&(f.endsWith(".d.ts")||f.endsWith(".d.cts")||f.endsWith(".d.mts"))){let d=n.moduleSpecifier.getStart()+1,w=n.moduleSpecifier.getEnd()-1;e.unshift({name:"",exports:[],location:{start:d,end:w},textBeforeCodeAfter:f.replace(/\.d\.ts$/,".js").replace(/\.d\.cts$/,".cjs").replace(/\.d\.mts$/,".mjs")})}}if(r.isModuleDeclaration(n)&&n.body&&r.isModuleBlock(n.body)){for(const f of n.body.statements)if(r.isExportDeclaration(f)&&f.exportClause){if(r.isNamespaceExport(f.exportClause))continue;for(const d of f.exportClause.elements)d.propertyName&&d.propertyName.getText()==d.name.getText()&&e.unshift({name:"",exports:[],location:{start:d.propertyName.getEnd(),end:d.name.getEnd()}})}}if(r.isClassDeclaration(n)?t[n.name.getText()]={type:"class",generics:n.typeParameters}:r.isFunctionDeclaration(n)?t[n.name.getText()]={type:"function"}:r.isInterfaceDeclaration(n)?t[n.name.getText()]={type:"interface",generics:n.typeParameters}:r.isTypeAliasDeclaration(n)?t[n.name.getText()]={type:"type",generics:n.typeParameters}:r.isModuleDeclaration(n)&&r.isIdentifier(n.name)?t[n.name.getText()]={type:"namespace"}:r.isEnumDeclaration(n)&&(t[n.name.getText()]={type:"enum"}),!r.isVariableStatement(n))continue;const{declarations:o}=n.declarationList;if(o.length!==1)continue;const p=o[0],c=p.name.getText();if(!p.initializer||!r.isCallExpression(p.initializer)){t[c]={type:"var"};continue}const l=p.initializer.arguments[0];if(!p.initializer.expression.getFullText().includes("/*#__PURE__*/Object.freeze")||!r.isObjectLiteralExpression(l))continue;const m=[];for(const f of l.properties){if(!r.isPropertyAssignment(f)||!(r.isIdentifier(f.name)||r.isStringLiteral(f.name))||f.name.text!=="__proto__"&&!r.isIdentifier(f.initializer))throw new h(f,"Expected a property assignment");f.name.text!=="__proto__"&&m.push({exportedName:f.name.text,localName:f.initializer.getText()})}e.unshift({name:c,exports:m,location:s})}return{namespaces:e,itemTypes:t}}fix(){var e;let t=this.sourceFile.getFullText();const{namespaces:n,itemTypes:s}=this.findNamespaces();for(const o of n){const p=t.slice(o.location.end);t=t.slice(0,o.location.start);for(const{exportedName:c,localName:l}of o.exports)if(c===l){const{type:m,generics:f}=s[l]||{};if(m==="interface"||m==="type"){const d=U(f);t+=`type ${o.name}_${c}${d.in} = ${l}${d.out};
`}else if(m==="enum"||m==="class"){const d=U(f);t+=`type ${o.name}_${c}${d.in} = ${l}${d.out};
`,t+=`declare const ${o.name}_${c}: typeof ${l};
`}else t+=`declare const ${o.name}_${c}: typeof ${l};
`}if(o.name){t+=`declare namespace ${o.name} {
`,t+=`  export {
`;for(const{exportedName:c,localName:l}of o.exports)c===l?t+=`    ${o.name}_${c} as ${c},
`:t+=`    ${l} as ${c},
`;t+=`  };
`,t+="}"}t+=(e=o.textBeforeCodeAfter)!==null&&e!==void 0?e:"",t+=p}return t}}function U(i){return!i||!i.length?{in:"",out:""}:{in:`<${i.map(e=>e.getText()).join(", ")}>`,out:`<${i.map(e=>e.name.getText()).join(", ")}>`}}let B=1;function he(i){return S({type:"Program",sourceType:"module",body:[]},{start:i.getFullStart(),end:i.getEnd()})}function ge(i){return{type:"AssignmentPattern",left:{type:"Identifier",name:String(B++)},right:i}}function v(i){return S({type:"Identifier",name:i.getText()},i)}function xe(i){const e=S({type:"FunctionExpression",id:null,params:[],body:{type:"BlockStatement",body:[]}},i),t=S({type:"ExpressionStatement",expression:{type:"CallExpression",callee:{type:"Identifier",name:String(B++)},arguments:[e],optional:!1}},i);return{fn:e,iife:t}}function Se(i,e){return S({type:"FunctionDeclaration",id:S({type:"Identifier",name:r.idText(i)},i),params:[],body:{type:"BlockStatement",body:[]}},e)}function P(i){if(r.isLiteralExpression(i))return{type:"Literal",value:i.text};if(r.isPropertyAccessExpression(i)){if(r.isPrivateIdentifier(i.name))throw new h(i.name);return S({type:"MemberExpression",computed:!1,optional:!1,object:P(i.expression),property:P(i.name)},{start:i.expression.getStart(),end:i.name.getEnd()})}if(r.isIdentifier(i))return v(i);if(i.kind==r.SyntaxKind.NullKeyword)return{type:"Literal",value:null};throw new h(i)}function S(i,e){let t="start"in e?e:{start:e.getStart(),end:e.getEnd()};return Object.assign(i,t)}function L(i,e){return(r.getCombinedModifierFlags(i)&e)===e}function ve({sourceFile:i}){const e=new oe.default(i.getFullText()),t=new Set,n=new Set;let s="";const o=new Map,p=new Map;for(const a of i.statements){if(r.isEmptyStatement(a)){e.remove(a.getStart(),a.getEnd());continue}if(r.isEnumDeclaration(a)||r.isFunctionDeclaration(a)||r.isInterfaceDeclaration(a)||r.isClassDeclaration(a)||r.isTypeAliasDeclaration(a)||r.isModuleDeclaration(a)){if(a.name){const u=a.name.getText();t.add(u),L(a,r.ModifierFlags.ExportDefault)?s=u:L(a,r.ModifierFlags.Export)&&n.add(u),a.flags&r.NodeFlags.GlobalAugmentation||N(u,[_(a),W(a)])}r.isModuleDeclaration(a)&&Te(e,a),z(e,a)}else if(r.isVariableStatement(a)){const{declarations:u}=a.declarationList,g=L(a,r.ModifierFlags.Export);for(const x of a.declarationList.declarations)if(r.isIdentifier(x.name)){const D=x.name.getText();t.add(D),g&&n.add(D)}if(z(e,a),u.length==1){const x=u[0];r.isIdentifier(x.name)&&N(x.name.getText(),[_(a),W(a)])}else{const x=u.slice(),D=x.shift();N(D.name.getText(),[_(a),D.getEnd()]);for(const C of x)r.isIdentifier(C.name)&&N(C.name.getText(),[C.getFullStart(),C.getEnd()])}const{flags:y}=a.declarationList,F=`declare ${y&r.NodeFlags.Let?"let":y&r.NodeFlags.Const?"const":"var"} `,A=a.declarationList.getChildren().find(x=>x.kind===r.SyntaxKind.SyntaxList).getChildren();let E=0;for(const x of A)if(x.kind===r.SyntaxKind.CommaToken)E=x.getStart(),e.remove(E,x.getEnd());else if(E){e.appendLeft(E,`;
`);const D=x.getFullStart(),C=e.slice(D,x.getStart());let j=C.length-C.trimStart().length;j?e.overwrite(D,D+j,F):e.appendLeft(D,F)}}}for(const a of i.statements)if(f(a),!!L(a,r.ModifierFlags.ExportDefault)&&(r.isFunctionDeclaration(a)||r.isClassDeclaration(a))){if(a.name)continue;s||(s=w("export_default"));const u=a.getChildren(),g=u.findIndex(A=>A.kind===r.SyntaxKind.ClassKeyword||A.kind===r.SyntaxKind.FunctionKeyword),y=u[g],b=u[g+1];b.kind>=r.SyntaxKind.FirstPunctuation&&b.kind<=r.SyntaxKind.LastPunctuation?e.appendLeft(b.getStart(),s):e.appendRight(y.getEnd(),` ${s}`)}for(const a of p.values()){const g=a.pop()[0];for(const y of a)e.move(y[0],y[1],g)}s&&e.append(`
export default ${s};
`),n.size&&e.append(`
export { ${[...n].join(", ")} };
`);for(const[a,u]of o.entries())e.prepend(`import * as ${u} from "${a}";
`);const c=i.getLineStarts(),l=new Set;for(const a of i.typeReferenceDirectives){l.add(a.fileName);const{line:u}=i.getLineAndCharacterOfPosition(a.pos),g=c[u];let y=i.getLineEndOfPosition(a.pos);e.slice(y,y+1)==`
`&&(y+=1),e.remove(g,y)}const m=new Set;for(const a of i.referencedFiles){m.add(a.fileName);const{line:u}=i.getLineAndCharacterOfPosition(a.pos),g=c[u];let y=i.getLineEndOfPosition(a.pos);e.slice(y,y+1)==`
`&&(y+=1),e.remove(g,y)}return{code:e,typeReferences:l,fileReferences:m};function f(a){if(r.forEachChild(a,f),r.isImportTypeNode(a)){if(!r.isLiteralTypeNode(a.argument)||!r.isStringLiteral(a.argument.literal))throw new h(a,"inline imports should have a literal argument");const u=a.argument.literal.text,g=a.getChildren(),y=g.find(E=>E.kind===r.SyntaxKind.ImportKeyword).getStart();let b=a.getEnd();const F=g.find(E=>E.kind===r.SyntaxKind.DotToken||E.kind===r.SyntaxKind.LessThanToken);F&&(b=F.getStart());const A=d(u);e.overwrite(y,b,A)}}function d(a){let u=o.get(a);return u||(u=w(a.replace(/[^a-zA-Z0-9_$]/g,()=>"_")),o.set(a,u)),u}function w(a){let u=a;for(;t.has(u);)u=`_${u}`;return t.add(u),u}function N(a,u){let g=p.get(a);if(!g)g=[u],p.set(a,g);else{const y=g[g.length-1];y[1]===u[0]?y[1]=u[1]:g.push(u)}}}function z(i,e){var t;let n=!1;const s=r.isClassDeclaration(e)||r.isFunctionDeclaration(e)||r.isModuleDeclaration(e)||r.isVariableStatement(e);for(const o of(t=e.modifiers)!==null&&t!==void 0?t:[])switch(o.kind){case r.SyntaxKind.ExportKeyword:case r.SyntaxKind.DefaultKeyword:i.remove(o.getStart(),o.getEnd()+1);break;case r.SyntaxKind.DeclareKeyword:n=!0}s&&!n&&i.appendRight(e.getStart(),"declare ")}function Te(i,e){if(!(!e.body||!r.isModuleBlock(e.body))){for(const t of e.body.statements)if(r.isExportDeclaration(t)&&t.exportClause){if(r.isNamespaceExport(t.exportClause))continue;for(const n of t.exportClause.elements)n.propertyName||i.appendLeft(n.name.getEnd(),` as ${n.name.getText()}`)}}}function _(i){const e=i.getFullStart();return e+(G(i,e)?1:0)}function W(i){const e=i.getEnd();return e+(G(i,e)?1:0)}function G(i,e){return i.getSourceFile().getFullText()[e]==`
`}const Ne=new Set([r.SyntaxKind.LiteralType,r.SyntaxKind.VoidKeyword,r.SyntaxKind.UnknownKeyword,r.SyntaxKind.AnyKeyword,r.SyntaxKind.BooleanKeyword,r.SyntaxKind.NumberKeyword,r.SyntaxKind.StringKeyword,r.SyntaxKind.ObjectKeyword,r.SyntaxKind.NullKeyword,r.SyntaxKind.UndefinedKeyword,r.SyntaxKind.SymbolKeyword,r.SyntaxKind.NeverKeyword,r.SyntaxKind.ThisKeyword,r.SyntaxKind.ThisType,r.SyntaxKind.BigIntKeyword]);class H{constructor({id:e,range:t}){if(this.scopes=[],e)this.declaration=Se(e,t);else{const{iife:n,fn:s}=xe(t);this.iife=n,this.declaration=s}}pushScope(){this.scopes.push(new Set)}popScope(e=1){for(let t=0;t<e;t++)this.scopes.pop()}pushTypeVariable(e){var t;const n=e.getText();(t=this.scopes[this.scopes.length-1])===null||t===void 0||t.add(n)}pushRaw(e){this.declaration.params.push(e)}pushReference(e){let t;if(e.type==="Identifier"?t=e.name:e.type==="MemberExpression"&&e.object.type==="Identifier"&&(t=e.object.name),t){for(const n of this.scopes)if(n.has(t))return}this.pushRaw(ge(e))}pushIdentifierReference(e){this.pushReference(v(e))}convertEntityName(e){return r.isIdentifier(e)?v(e):S({type:"MemberExpression",computed:!1,optional:!1,object:this.convertEntityName(e.left),property:v(e.right)},e)}convertPropertyAccess(e){if(!r.isIdentifier(e.expression)&&!r.isPropertyAccessExpression(e.expression))throw new h(e.expression);if(r.isPrivateIdentifier(e.name))throw new h(e.name);let t=r.isIdentifier(e.expression)?v(e.expression):this.convertPropertyAccess(e.expression);return S({type:"MemberExpression",computed:!1,optional:!1,object:t,property:v(e.name)},e)}convertComputedPropertyName(e){if(!e.name||!r.isComputedPropertyName(e.name))return;const{expression:t}=e.name;if(!(r.isLiteralExpression(t)||r.isPrefixUnaryExpression(t))){if(r.isIdentifier(t))return this.pushReference(v(t));if(r.isPropertyAccessExpression(t))return this.pushReference(this.convertPropertyAccess(t));throw new h(t)}}convertParametersAndType(e){this.convertComputedPropertyName(e);const t=this.convertTypeParameters(e.typeParameters);for(const n of e.parameters)this.convertTypeNode(n.type);this.convertTypeNode(e.type),this.popScope(t)}convertHeritageClauses(e){for(const t of e.heritageClauses||[])for(const n of t.types)this.pushReference(P(n.expression)),this.convertTypeArguments(n)}convertTypeArguments(e){if(!!e.typeArguments)for(const t of e.typeArguments)this.convertTypeNode(t)}convertMembers(e){for(const t of e){if(r.isPropertyDeclaration(t)||r.isPropertySignature(t)||r.isIndexSignatureDeclaration(t)){this.convertComputedPropertyName(t),this.convertTypeNode(t.type);continue}if(r.isMethodDeclaration(t)||r.isMethodSignature(t)||r.isConstructorDeclaration(t)||r.isConstructSignatureDeclaration(t)||r.isCallSignatureDeclaration(t)||r.isGetAccessorDeclaration(t)||r.isSetAccessorDeclaration(t))this.convertParametersAndType(t);else throw new h(t)}}convertTypeParameters(e){if(!e)return 0;for(const t of e)this.convertTypeNode(t.constraint),this.convertTypeNode(t.default),this.pushScope(),this.pushTypeVariable(t.name);return e.length}convertTypeNode(e){if(!!e&&!Ne.has(e.kind)){if(r.isTypeReferenceNode(e)){this.pushReference(this.convertEntityName(e.typeName)),this.convertTypeArguments(e);return}if(r.isTypeLiteralNode(e))return this.convertMembers(e.members);if(r.isArrayTypeNode(e))return this.convertTypeNode(e.elementType);if(r.isTupleTypeNode(e)){for(const t of e.elements)this.convertTypeNode(t);return}if(r.isNamedTupleMember(e)||r.isParenthesizedTypeNode(e)||r.isTypeOperatorNode(e)||r.isTypePredicateNode(e))return this.convertTypeNode(e.type);if(r.isUnionTypeNode(e)||r.isIntersectionTypeNode(e)){for(const t of e.types)this.convertTypeNode(t);return}if(r.isMappedTypeNode(e)){const{typeParameter:t,type:n,nameType:s}=e;this.convertTypeNode(t.constraint),this.pushScope(),this.pushTypeVariable(t.name),this.convertTypeNode(n),s&&this.convertTypeNode(s),this.popScope();return}if(r.isConditionalTypeNode(e)){this.convertTypeNode(e.checkType),this.pushScope(),this.convertTypeNode(e.extendsType),this.convertTypeNode(e.trueType),this.convertTypeNode(e.falseType),this.popScope();return}if(r.isIndexedAccessTypeNode(e)){this.convertTypeNode(e.objectType),this.convertTypeNode(e.indexType);return}if(r.isFunctionOrConstructorTypeNode(e)){this.convertParametersAndType(e);return}if(r.isTypeQueryNode(e)){this.pushReference(this.convertEntityName(e.exprName));return}if(r.isRestTypeNode(e)){this.convertTypeNode(e.type);return}if(r.isOptionalTypeNode(e)){this.convertTypeNode(e.type);return}if(r.isTemplateLiteralTypeNode(e)){for(const t of e.templateSpans)this.convertTypeNode(t.type);return}if(r.isInferTypeNode(e)){this.pushTypeVariable(e.typeParameter.name);return}else throw new h(e)}}convertNamespace(e,t=!1){if(this.pushScope(),t&&e.body&&r.isModuleDeclaration(e.body)){this.convertNamespace(e.body,!0);return}if(!e.body||!r.isModuleBlock(e.body))throw new h(e,'namespace must have a "ModuleBlock" body.');const{statements:n}=e.body;for(const s of n){if(r.isEnumDeclaration(s)||r.isFunctionDeclaration(s)||r.isClassDeclaration(s)||r.isInterfaceDeclaration(s)||r.isTypeAliasDeclaration(s)||r.isModuleDeclaration(s)){if(s.name&&r.isIdentifier(s.name))this.pushTypeVariable(s.name);else throw new h(s,"non-Identifier name not supported");continue}if(r.isVariableStatement(s)){for(const o of s.declarationList.declarations)if(r.isIdentifier(o.name))this.pushTypeVariable(o.name);else throw new h(o,"non-Identifier name not supported");continue}if(!r.isExportDeclaration(s))throw new h(s,"namespace child (hoisting) not supported yet")}for(const s of n){if(r.isVariableStatement(s)){for(const o of s.declarationList.declarations)o.type&&this.convertTypeNode(o.type);continue}if(r.isFunctionDeclaration(s)){this.convertParametersAndType(s);continue}if(r.isInterfaceDeclaration(s)||r.isClassDeclaration(s)){const o=this.convertTypeParameters(s.typeParameters);this.convertHeritageClauses(s),this.convertMembers(s.members),this.popScope(o);continue}if(r.isTypeAliasDeclaration(s)){const o=this.convertTypeParameters(s.typeParameters);this.convertTypeNode(s.type),this.popScope(o);continue}if(r.isModuleDeclaration(s)){this.convertNamespace(s,t);continue}if(!r.isEnumDeclaration(s))if(r.isExportDeclaration(s)){if(s.exportClause){if(r.isNamespaceExport(s.exportClause))throw new h(s.exportClause);for(const o of s.exportClause.elements){const p=o.propertyName||o.name;this.pushIdentifierReference(p)}}}else throw new h(s,"namespace child (walking) not supported yet")}this.popScope()}}function De({sourceFile:i}){return new Ee(i).transform()}class Ee{constructor(e){this.sourceFile=e,this.declarations=new Map,this.ast=he(e);for(const t of e.statements)this.convertStatement(t)}transform(){return{ast:this.ast}}pushStatement(e){this.ast.body.push(e)}createDeclaration(e,t){const n={start:e.getFullStart(),end:e.getEnd()};if(!t){const c=new H({range:n});return this.pushStatement(c.iife),c}const s=t.getText(),o=new H({id:t,range:n}),p=this.declarations.get(s);if(p){p.pushIdentifierReference(t),p.declaration.end=n.end;let c=this.ast.body.findIndex(l=>l==p.declaration);for(let l=c+1;l<this.ast.body.length;l++){const m=this.ast.body[l];m.start=m.end=n.end}}else this.pushStatement(o.declaration),this.declarations.set(s,o);return p||o}convertStatement(e){if(r.isEnumDeclaration(e))return this.convertEnumDeclaration(e);if(r.isFunctionDeclaration(e))return this.convertFunctionDeclaration(e);if(r.isInterfaceDeclaration(e)||r.isClassDeclaration(e))return this.convertClassOrInterfaceDeclaration(e);if(r.isTypeAliasDeclaration(e))return this.convertTypeAliasDeclaration(e);if(r.isVariableStatement(e))return this.convertVariableStatement(e);if(r.isExportDeclaration(e)||r.isExportAssignment(e))return this.convertExportDeclaration(e);if(r.isModuleDeclaration(e))return this.convertNamespaceDeclaration(e);if(e.kind==r.SyntaxKind.NamespaceExportDeclaration)return this.removeStatement(e);if(r.isImportDeclaration(e)||r.isImportEqualsDeclaration(e))return this.convertImportDeclaration(e);throw new h(e)}removeStatement(e){this.pushStatement(S({type:"ExpressionStatement",expression:{type:"Literal",value:"pls remove me"}},e))}convertNamespaceDeclaration(e){if(e.flags&r.NodeFlags.GlobalAugmentation||!r.isIdentifier(e.name)){this.createDeclaration(e).convertNamespace(e,!0);return}const n=this.createDeclaration(e,e.name);n.pushIdentifierReference(e.name),n.convertNamespace(e)}convertEnumDeclaration(e){this.createDeclaration(e,e.name).pushIdentifierReference(e.name)}convertFunctionDeclaration(e){if(!e.name)throw new h(e,"FunctionDeclaration should have a name");const t=this.createDeclaration(e,e.name);t.pushIdentifierReference(e.name),t.convertParametersAndType(e)}convertClassOrInterfaceDeclaration(e){if(!e.name)throw new h(e,"ClassDeclaration / InterfaceDeclaration should have a name");const t=this.createDeclaration(e,e.name),n=t.convertTypeParameters(e.typeParameters);t.convertHeritageClauses(e),t.convertMembers(e.members),t.popScope(n)}convertTypeAliasDeclaration(e){const t=this.createDeclaration(e,e.name),n=t.convertTypeParameters(e.typeParameters);t.convertTypeNode(e.type),t.popScope(n)}convertVariableStatement(e){const{declarations:t}=e.declarationList;if(t.length!==1)throw new h(e,"VariableStatement with more than one declaration not yet supported");for(const n of t){if(!r.isIdentifier(n.name))throw new h(e,"VariableDeclaration must have a name");this.createDeclaration(e,n.name).convertTypeNode(n.type)}}convertExportDeclaration(e){if(r.isExportAssignment(e)){this.pushStatement(S({type:"ExportDefaultDeclaration",declaration:P(e.expression)},e));return}const t=e.moduleSpecifier?P(e.moduleSpecifier):void 0;if(!e.exportClause)this.pushStatement(S({type:"ExportAllDeclaration",source:t,exported:null},e));else if(r.isNamespaceExport(e.exportClause))this.pushStatement(S({type:"ExportAllDeclaration",source:t,exported:v(e.exportClause.name)},e));else{const n=[];for(const s of e.exportClause.elements)n.push(this.convertExportSpecifier(s));this.pushStatement(S({type:"ExportNamedDeclaration",declaration:null,specifiers:n,source:t},e))}}convertImportDeclaration(e){if(r.isImportEqualsDeclaration(e)){if(!r.isExternalModuleReference(e.moduleReference))throw new h(e,"ImportEquals should have a literal source.");this.pushStatement(S({type:"ImportDeclaration",specifiers:[{type:"ImportDefaultSpecifier",local:v(e.name)}],source:P(e.moduleReference.expression)},e));return}const t=P(e.moduleSpecifier),n=e.importClause&&e.importClause.namedBindings?this.convertNamedImportBindings(e.importClause.namedBindings):[];e.importClause&&e.importClause.name&&n.push({type:"ImportDefaultSpecifier",local:v(e.importClause.name)}),this.pushStatement(S({type:"ImportDeclaration",specifiers:n,source:t},e))}convertNamedImportBindings(e){return r.isNamedImports(e)?e.elements.map(t=>{const n=v(t.name),s=t.propertyName?v(t.propertyName):n;return{type:"ImportSpecifier",local:n,imported:s}}):[{type:"ImportNamespaceSpecifier",local:v(e.name)}]}convertExportSpecifier(e){const t=v(e.name);return{type:"ExportSpecifier",exported:t,local:e.propertyName?v(e.propertyName):t}}}function k(i,e){return r.createSourceFile(i,e,r.ScriptTarget.Latest,!0)}const we=()=>{const i=new Map,e=new Map;return{name:"dts-transform",options(t){const{onwarn:n}=t;return K(I({},t),{onwarn(s,o){s.code!="CIRCULAR_DEPENDENCY"&&(n?n(s,o):o(s))},treeshake:{moduleSideEffects:"no-external",propertyReadSideEffects:!0,unknownGlobalSideEffects:!1}})},outputOptions(t){return K(I({},t),{chunkFileNames:t.chunkFileNames||"[name]-[hash].d.ts",entryFileNames:t.entryFileNames||"[name].d.ts",format:"es",exports:"named",compact:!1,freeze:!0,interop:!1,namespaceToStringTag:!1,strict:!1})},transform(t,n){let s=k(n,t);const o=ve({sourceFile:s});i.set(s.fileName,o.typeReferences),e.set(s.fileName,o.fileReferences),t=o.code.toString(),s=k(n,t);const p=De({sourceFile:s});return process.env.DTS_DUMP_AST&&(console.log(n),console.log(t),console.log(JSON.stringify(p.ast.body,void 0,2))),{code:t,ast:p.ast,map:o.code.generateMap()}},renderChunk(t,n,s){const o=k(n.fileName,t),p=new ye(o),c=new Set,l=new Set;for(const m of Object.keys(n.modules)){for(const f of i.get(m.split("\\").join("/"))||[])c.add(f);for(const f of e.get(m.split("\\").join("/"))||[])if(f.startsWith(".")){const d=T.join(T.dirname(m),f),w=s.file&&T.dirname(s.file)||n.facadeModuleId&&T.dirname(n.facadeModuleId)||".";let N=T.relative(w,d).split("\\").join("/");N[0]!=="."&&(N="./"+N),l.add(N)}else l.add(f)}return t=J(Array.from(l,m=>`/// <reference path="${m}" />`)),t+=J(Array.from(c,m=>`/// <reference types="${m}" />`)),t+=p.fix(),{code:t,map:{mappings:""}}}}};function J(i){return i.length?i.join(`
`)+`
`:""}const Y=/\.(t|j)sx?$/,be=(i={})=>{const e=we(),{respectExternal:t=!1,compilerOptions:n={}}=i;let s=[];function o(p){let c,l;return!s.length&&p.endsWith($)?c=!0:(l=s.find(m=>c=m.getSourceFile(p)),!l&&r.sys.fileExists(p)&&(s.push(l=pe(p,n)),c=l.getSourceFile(p))),{source:c,program:l}}return{name:"dts",options(p){let{input:c=[]}=p;if(!Array.isArray(c))c=typeof c=="string"?[c]:Object.values(c);else if(c.length>1){p.input={};for(const l of c){let m=l.replace(/((\.d)?\.(t|j)sx?)$/,"");T.isAbsolute(l)?m=T.basename(m):m=T.normalize(m),p.input[m]=l}}return s=fe(Object.values(c),n),e.options.call(this,p)},outputOptions:e.outputOptions,transform(p,c){const l=(a,u)=>(typeof a=="object"&&(p=a.getFullText()),e.transform.call(this,p,u));if(!Y.test(c))return null;if(c.endsWith($)){const{source:a}=o(c);return a?l(a,c):null}const m=c.replace(Y,$);let f=o(m);if(f.source)return l(f.source,m);if(f=o(c),typeof f.source!="object"||!f.program)return null;let d;const{emitSkipped:w,diagnostics:N}=f.program.emit(f.source,(a,u)=>{p=u,d=l(!0,m)},void 0,!0);if(w){const a=N.filter(u=>u.category===r.DiagnosticCategory.Error);a.length&&(console.error(r.formatDiagnostics(a,R)),this.error("Failed to compile. Check the logs above."))}return d},resolveId(p,c){if(!c)return;c=c.split("\\").join("/");const{resolvedModule:l}=r.nodeModuleNameResolver(p,c,n,r.sys);if(!!l)return!t&&l.isExternalLibraryImport?{id:p,external:!0}:{id:T.resolve(l.resolvedFileName)}},renderChunk:e.renderChunk}};exports.default=be;
