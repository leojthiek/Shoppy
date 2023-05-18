"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[380],{1380:function(e,n,r){r.r(n),r.d(n,{default:function(){return p}});var t=r(9439),s=r(2791),i=r(9743),c=r(3360),a=r(2677),d=r(2591),o=r(7689),u=r(3524),l=r(9434),f=r(2377),h=r(5236),m=r(1564),x=r(6508),j=r(6673),v=r(5193),Z=r(184);function p(){var e=s.useState(!1),n=(0,t.Z)(e,2),r=n[0],p=n[1],N=(0,v.Z)("(max-width:987px)"),w=(0,l.I0)(),y=(0,o.s0)(),g=(0,l.v9)((function(e){return e.offerList})),b=g.loading,C=g.error,E=g.offers,M=(0,l.v9)((function(e){return e.userLogin})).userInfo,k=(0,l.v9)((function(e){return e.createOffer})).success,S=(0,l.v9)((function(e){return e.offerDelete})),T=S.error,D=S.loading,L=S.success;s.useEffect((function(){M&&M.isAdmin&&w((0,u.D9)())}),[w,M,L,k]);return(0,Z.jsxs)(i.Z,{children:[N?(0,Z.jsxs)("div",{children:[(0,Z.jsx)(c.Z,{className:"sidebar-menu",variant:"primary",onClick:function(){return p(!0)},children:"menu"}),(0,Z.jsxs)(j.Z,{show:r,onHide:function(){return p(!1)},children:[(0,Z.jsx)(j.Z.Header,{closeButton:!0}),(0,Z.jsx)(j.Z.Body,{children:(0,Z.jsx)(x.Z,{})})]})]}):(0,Z.jsx)(a.Z,{md:2,children:(0,Z.jsx)(x.Z,{})}),(0,Z.jsx)(a.Z,{md:10,children:(0,Z.jsxs)("div",{className:"coupon-main",children:[(0,Z.jsxs)(i.Z,{children:[(0,Z.jsx)(a.Z,{children:(0,Z.jsx)("h4",{className:"couponscreen-title",children:"Offer List"})}),(0,Z.jsx)(a.Z,{className:"d-flex justify-content-end",children:(0,Z.jsxs)(c.Z,{onClick:function(){y("/admin/offer/create")},className:"my-3",children:[(0,Z.jsx)("i",{className:"fas fa-plus"})," Create New Offer"]})})]}),D&&(0,Z.jsx)(f.Z,{}),T&&(0,Z.jsx)(h.Z,{variant:"danger",children:T}),b?(0,Z.jsx)(f.Z,{}):C?(0,Z.jsx)(h.Z,{variant:"danger",children:C}):(0,Z.jsxs)(d.Z,{bordered:!0,hover:!0,responsive:!0,className:"table-sm",children:[(0,Z.jsx)("thead",{children:(0,Z.jsxs)("tr",{className:"couponscreen-table-head",children:[(0,Z.jsx)("td",{children:"OFFER ID"}),(0,Z.jsx)("td",{children:"OFFER TITLE"}),(0,Z.jsx)("td",{children:"CATEGORY"}),(0,Z.jsx)("td",{children:"DISCOUNT PERCENTAGE"}),(0,Z.jsx)("td",{children:"STATUS"}),(0,Z.jsx)("td",{})]})}),(0,Z.jsx)("tbody",{children:E.map((function(e){return(0,Z.jsxs)("tr",{className:"couponscreen-table-main",children:[(0,Z.jsx)("td",{children:e._id}),(0,Z.jsx)("td",{children:e.title}),(0,Z.jsx)("td",{children:e.category}),(0,Z.jsx)("td",{children:e.discountPercentage}),(0,Z.jsx)("td",{children:new Date(e.endDate).getTime()>(new Date).getTime()?(0,Z.jsx)("i",{className:"fas fa-circle text-success"}):(0,Z.jsx)("i",{className:"fas fa-circle text-danger"})}),(0,Z.jsxs)("td",{children:[(0,Z.jsx)(m.J,{to:"/admin/offer/".concat(e._id),children:(0,Z.jsx)(c.Z,{variant:"light",className:"btn-sm",style:{color:"black"},children:(0,Z.jsx)("i",{className:"fas fa-edit"})})}),"\xa0",(0,Z.jsx)(c.Z,{variant:"danger",className:"btn-sm",onClick:function(){return n=e._id,void(window.confirm("Do you want to delete this coupon completely")&&w((0,u.SE)(n)));var n},children:(0,Z.jsx)("i",{className:"fas fa-trash"})})]})]},e._id)}))})]})]})})]})}},5193:function(e,n,r){var t;r.d(n,{Z:function(){return f}});var s=r(9439),i=r(2791),c=r(9120),a=r(1537),d=r(2886);function o(e,n,r,t,c){var a=i.useState((function(){return c&&r?r(e).matches:t?t(e).matches:n})),o=(0,s.Z)(a,2),u=o[0],l=o[1];return(0,d.Z)((function(){var n=!0;if(r){var t=r(e),s=function(){n&&l(t.matches)};return s(),t.addListener(s),function(){n=!1,t.removeListener(s)}}}),[e,r]),u}var u=(t||(t=r.t(i,2))).useSyncExternalStore;function l(e,n,r,t,c){var a=i.useCallback((function(){return n}),[n]),d=i.useMemo((function(){if(c&&r)return function(){return r(e).matches};if(null!==t){var n=t(e).matches;return function(){return n}}return a}),[a,e,t,c,r]),o=i.useMemo((function(){if(null===r)return[a,function(){return function(){}}];var n=r(e);return[function(){return n.matches},function(e){return n.addListener(e),function(){n.removeListener(e)}}]}),[a,r,e]),l=(0,s.Z)(o,2),f=l[0],h=l[1];return u(h,f,d)}function f(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=(0,c.Z)(),t="undefined"!==typeof window&&"undefined"!==typeof window.matchMedia,s=(0,a.Z)({name:"MuiUseMediaQuery",props:n,theme:r}),i=s.defaultMatches,d=void 0!==i&&i,f=s.matchMedia,h=void 0===f?t?window.matchMedia:null:f,m=s.ssrMatchMedia,x=void 0===m?null:m,j=s.noSsr,v=void 0!==j&&j;var Z="function"===typeof e?e(r):e;return Z=Z.replace(/^@media( ?)/m,""),(void 0!==u?l:o)(Z,d,h,x,v)}}}]);
//# sourceMappingURL=380.94f83fb2.chunk.js.map