/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.115
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

require{a as y}from"./chunk-FZIR7YHL.js";require{d as L}from"./chunk-LYPPBP4Q.js";require{b as d,c as W}from"./chunk-S7TTFAYA.js";require{a as R}from"./chunk-TLYHKSDJ.js";require{a as s,c as T,d as q}from"./chunk-PYVDHCDQ.js";require{a as w}from"./chunk-JMWWNZHX.js";require{a as P}from"./chunk-Z3SYNMQT.js";require{a as A,b as z}from"./chunk-4KGDZUZQ.js";require{e as l}from"./chunk-F3TINEFX.js";function x(o,t){z.typeOf.object("ellipsoid",o),this._ellipsoid=o,this._cameraPosition=new s,this._cameraPositionInScaledSpace=new s,this._distanceToLimbInScaledSpaceSquared=0,l(t)&&(this.cameraPosition=t)}Object.defineProperties(x.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(o){let e=this._ellipsoid.transformPositionToScaledSpace(o,this._cameraPositionInScaledSpace),n=s.magnitudeSquared(e)-1;s.clone(o,this._cameraPosition),this._cameraPositionInScaledSpace=e,this._distanceToLimbInScaledSpaceSquared=n}}});var j=new s;x.prototype.isPointVisible=function(o){let e=this._ellipsoid.transformPositionToScaledSpace(o,j);return F(e,this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)};x.prototype.isScaledSpacePointVisible=function(o){return F(o,this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)};var it=new s;x.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid=function(o,t){let e=this._ellipsoid,n,i;return l(t)&&t<0&&e.minimumRadius>-t?(i=it,i.x=this._cameraPosition.x/(e.radii.x+t),i.y=this._cameraPosition.y/(e.radii.y+t),i.z=this._cameraPosition.z/(e.radii.z+t),n=i.x*i.x+i.y*i.y+i.z*i.z-1):(i=this._cameraPositionInScaledSpace,n=this._distanceToLimbInScaledSpaceSquared),F(o,i,n)};x.prototype.computeHorizonCullingPoint=function(o,t,e){return Z(this._ellipsoid,o,t,e)};var U=q.clone(q.UNIT_SPHERE);x.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid=function(o,t,e,n){let i=v(this._ellipsoid,e,U);return Z(i,o,t,n)};x.prototype.computeHorizonCullingPointFromVertices=function(o,t,e,n,i){return Q(this._ellipsoid,o,t,e,n,i)};x.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid=function(o,t,e,n,i,c){let a=v(this._ellipsoid,i,U);return Q(a,o,t,e,n,c)};var nt=[];x.prototype.computeHorizonCullingPointFromRectangle=function(o,t,e){z.typeOf.object("rectangle",o);let n=W.subsample(o,t,0,nt),i=L.fromPoints(n);if(!(s.magnitude(i.center)<.1*t.minimumRadius))return this.computeHorizonCullingPoint(i.center,n,e)};var at=new s;function v(o,t,e){if(l(t)&&t<0&&o.minimumRadius>-t){let n=s.fromElements(o.radii.x+t,o.radii.y+t,o.radii.z+t,at);o=q.fromCartesian3(n,e)}return o}function Z(o,t,e,n){z.typeOf.object("directionToPoint",t),z.defined("positions",e),l(n)||(n=new s);let i=X(o,t),c=0;for(let a=0,r=e.length;a<r;++a){let m=e[a],h=J(o,m,i);if(h<0)return;c=Math.max(c,h)}return K(i,c,n)}var M=new s;function Q(o,t,e,n,i,c){z.typeOf.object("directionToPoint",t),z.defined("vertices",e),z.typeOf.number("stride",n),l(c)||(c=new s),n=P(n,3),i=P(i,s.ZERO);let a=X(o,t),r=0;for(let m=0,h=e.length;m<h;m+=n){M.x=e[m]+i.x,M.y=e[m+1]+i.y,M.z=e[m+2]+i.z;let u=J(o,M,a);if(u<0)return;r=Math.max(r,u)}return K(a,r,c)}function F(o,t,e){let n=t,i=e,c=s.subtract(o,n,j),a=-s.dot(c,n);return!(i<0?a>0:a>i&&a*a/s.magnitudeSquared(c)>i)}var st=new s,ct=new s;function J(o,t,e){let n=o.transformPositionToScaledSpace(t,st),i=s.magnitudeSquared(n),c=Math.sqrt(i),a=s.divideByScalar(n,c,ct);i=Math.max(1,i),c=Math.max(1,c);let r=s.dot(a,e),m=s.magnitude(s.cross(a,e,a)),h=1/c,u=Math.sqrt(i-1)*h;return 1/(r*h-m*u)}function K(o,t,e){if(!(t<=0||t===1/0||t!==t))return s.multiplyByScalar(o,t,e)}var D=new s;function X(o,t){return s.equals(t,s.ZERO)?t:(o.transformPositionToScaledSpace(t,D),s.normalize(D,D))}var zt=x;var O={};O.getHeight=function(o,t,e){if(!Number.isFinite(t))throw new A("scale must be a finite number.");if(!Number.isFinite(e))throw new A("relativeHeight must be a finite number.");return(o-e)*t+e};var rt=new s;O.getPosition=function(o,t,e,n,i){let c=t.cartesianToCartographic(o,rt);if(!l(c))return s.clone(o,i);let a=O.getHeight(c.height,e,n);return s.fromRadians(c.longitude,c.latitude,a,t,i)};var Y=O;var mt={NONE:0,BITS12:1},S=Object.freeze(mt);var E=new s,dt=new s,f=new T,V=new d,lt=new d,ht=Math.pow(2,12);function p(o,t,e,n,i,c,a,r,m,h){let u=S.NONE,g,N;if(l(t)&&l(e)&&l(n)&&l(i)){let C=t.minimum,I=t.maximum,_=s.subtract(I,C,dt),B=n-e;Math.max(s.maximumComponent(_),B)<ht-1?u=S.BITS12:u=S.NONE,g=d.inverseTransformation(i,new d);let tt=s.negate(C,E);d.multiply(d.fromTranslation(tt,V),g,g);let b=E;b.x=1/_.x,b.y=1/_.y,b.z=1/_.z,d.multiply(d.fromScale(b,V),g,g),N=d.clone(i),d.setTranslation(N,s.ZERO,N),i=d.clone(i,new d);let ot=d.fromTranslation(C,V),et=d.fromScale(_,lt),k=d.multiply(ot,et,V);d.multiply(i,k,i),d.multiply(N,k,N)}this.quantization=u,this.minimumHeight=e,this.maximumHeight=n,this.center=s.clone(o),this.toScaledENU=g,this.fromScaledENU=i,this.matrix=N,this.hasVertexNormals=c,this.hasWebMercatorT=P(a,!1),this.hasGeodeticSurfaceNormals=P(r,!1),this.exaggeration=P(m,1),this.exaggerationRelativeHeight=P(h,0),this.stride=0,this._offsetGeodeticSurfaceNormal=0,this._offsetVertexNormal=0,this._calculateStrideAndOffsets()}p.prototype.encode=function(o,t,e,n,i,c,a,r){let m=n.x,h=n.y;if(this.quantization===S.BITS12){e=d.multiplyByPoint(this.toScaledENU,e,E),e.x=w.clamp(e.x,0,1),e.y=w.clamp(e.y,0,1),e.z=w.clamp(e.z,0,1);let u=this.maximumHeight-this.minimumHeight,g=w.clamp((i-this.minimumHeight)/u,0,1);T.fromElements(e.x,e.y,f);let N=y.compressTextureCoordinates(f);T.fromElements(e.z,g,f);let C=y.compressTextureCoordinates(f);T.fromElements(m,h,f);let I=y.compressTextureCoordinates(f);if(o[t++]=N,o[t++]=C,o[t++]=I,this.hasWebMercatorT){T.fromElements(a,0,f);let _=y.compressTextureCoordinates(f);o[t++]=_}}else s.subtract(e,this.center,E),o[t++]=E.x,o[t++]=E.y,o[t++]=E.z,o[t++]=i,o[t++]=m,o[t++]=h,this.hasWebMercatorT&&(o[t++]=a);return this.hasVertexNormals&&(o[t++]=y.octPackFloat(c)),this.hasGeodeticSurfaceNormals&&(o[t++]=r.x,o[t++]=r.y,o[t++]=r.z),t};var pt=new s,$=new s;p.prototype.addGeodeticSurfaceNormals=function(o,t,e){if(this.hasGeodeticSurfaceNormals)return;let n=this.stride,i=o.length/n;this.hasGeodeticSurfaceNormals=!0,this._calculateStrideAndOffsets();let c=this.stride;for(let a=0;a<i;a++){for(let u=0;u<n;u++){let g=a*n+u,N=a*c+u;t[N]=o[g]}let r=this.decodePosition(t,a,pt),m=e.geodeticSurfaceNormal(r,$),h=a*c+this._offsetGeodeticSurfaceNormal;t[h]=m.x,t[h+1]=m.y,t[h+2]=m.z}};p.prototype.removeGeodeticSurfaceNormals=function(o,t){if(!this.hasGeodeticSurfaceNormals)return;let e=this.stride,n=o.length/e;this.hasGeodeticSurfaceNormals=!1,this._calculateStrideAndOffsets();let i=this.stride;for(let c=0;c<n;c++)for(let a=0;a<i;a++){let r=c*e+a,m=c*i+a;t[m]=o[r]}};p.prototype.decodePosition=function(o,t,e){if(l(e)||(e=new s),t*=this.stride,this.quantization===S.BITS12){let n=y.decompressTextureCoordinates(o[t],f);e.x=n.x,e.y=n.y;let i=y.decompressTextureCoordinates(o[t+1],f);return e.z=i.x,d.multiplyByPoint(this.fromScaledENU,e,e)}return e.x=o[t],e.y=o[t+1],e.z=o[t+2],s.add(e,this.center,e)};p.prototype.getExaggeratedPosition=function(o,t,e){e=this.decodePosition(o,t,e);let n=this.exaggeration,i=this.exaggerationRelativeHeight;if(n!==1&&this.hasGeodeticSurfaceNormals){let a=this.decodeGeodeticSurfaceNormal(o,t,$),r=this.decodeHeight(o,t),m=Y.getHeight(r,n,i)-r;e.x+=a.x*m,e.y+=a.y*m,e.z+=a.z*m}return e};p.prototype.decodeTextureCoordinates=function(o,t,e){return l(e)||(e=new T),t*=this.stride,this.quantization===S.BITS12?y.decompressTextureCoordinates(o[t+2],e):T.fromElements(o[t+4],o[t+5],e)};p.prototype.decodeHeight=function(o,t){return t*=this.stride,this.quantization===S.BITS12?y.decompressTextureCoordinates(o[t+1],f).y*(this.maximumHeight-this.minimumHeight)+this.minimumHeight:o[t+3]};p.prototype.decodeWebMercatorT=function(o,t){return t*=this.stride,this.quantization===S.BITS12?y.decompressTextureCoordinates(o[t+3],f).x:o[t+6]};p.prototype.getOctEncodedNormal=function(o,t,e){t=t*this.stride+this._offsetVertexNormal;let n=o[t]/256,i=Math.floor(n),c=(n-i)*256;return T.fromElements(i,c,e)};p.prototype.decodeGeodeticSurfaceNormal=function(o,t,e){return t=t*this.stride+this._offsetGeodeticSurfaceNormal,e.x=o[t],e.y=o[t+1],e.z=o[t+2],e};p.prototype._calculateStrideAndOffsets=function(){let o=0;switch(this.quantization){case S.BITS12:o+=3;break;default:o+=6}this.hasWebMercatorT&&(o+=1),this.hasVertexNormals&&(this._offsetVertexNormal=o,o+=1),this.hasGeodeticSurfaceNormals&&(this._offsetGeodeticSurfaceNormal=o,o+=3),this.stride=o};var G={position3DAndHeight:0,textureCoordAndEncodedNormals:1,geodeticSurfaceNormal:2},H={compressed0:0,compressed1:1,geodeticSurfaceNormal:2};p.prototype.getAttributes=function(o){let t=R.FLOAT,e=R.getSizeInBytes(t),n=this.stride*e,i=0,c=[];function a(r,m){c.push({index:r,vertexBuffer:o,componentDatatype:t,componentsPerAttribute:m,offsetInBytes:i,strideInBytes:n}),i+=m*e}if(this.quantization===S.NONE){a(G.position3DAndHeight,4);let r=2;r+=this.hasWebMercatorT?1:0,r+=this.hasVertexNormals?1:0,a(G.textureCoordAndEncodedNormals,r),this.hasGeodeticSurfaceNormals&&a(G.geodeticSurfaceNormal,3)}else{let r=this.hasWebMercatorT||this.hasVertexNormals,m=this.hasWebMercatorT&&this.hasVertexNormals;a(H.compressed0,r?4:3),m&&a(H.compressed1,1),this.hasGeodeticSurfaceNormals&&a(H.geodeticSurfaceNormal,3)}return c};p.prototype.getAttributeLocations=function(){return this.quantization===S.NONE?G:H};p.clone=function(o,t){if(l(o))return l(t)||(t=new p),t.quantization=o.quantization,t.minimumHeight=o.minimumHeight,t.maximumHeight=o.maximumHeight,t.center=s.clone(o.center),t.toScaledENU=d.clone(o.toScaledENU),t.fromScaledENU=d.clone(o.fromScaledENU),t.matrix=d.clone(o.matrix),t.hasVertexNormals=o.hasVertexNormals,t.hasWebMercatorT=o.hasWebMercatorT,t.hasGeodeticSurfaceNormals=o.hasGeodeticSurfaceNormals,t.exaggeration=o.exaggeration,t.exaggerationRelativeHeight=o.exaggerationRelativeHeight,t._calculateStrideAndOffsets(),t};var Ft=p;export { zt as a, Ft as b };

