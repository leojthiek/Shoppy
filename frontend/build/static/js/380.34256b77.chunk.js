"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[380],{1380:function(e,s,n){n.r(s),n.d(s,{default:function(){return v}});var r=n(9439),c=n(2791),i=n(9743),t=n(3360),a=n(2677),d=n(2591),l=n(7689),o=n(3524),f=n(9434),x=n(2377),u=n(5236),h=n(1564),j=n(8221),m=n(6673),Z=n(2397),N=n(184);function v(){var e=c.useState(!1),s=(0,r.Z)(e,2),n=s[0],v=s[1],p=(0,Z.Z)("(max-width:987px)"),g=(0,f.I0)(),b=(0,l.s0)(),w=(0,f.v9)((function(e){return e.offerList})),y=w.loading,C=w.error,E=w.offers,T=(0,f.v9)((function(e){return e.userLogin})).userInfo,k=(0,f.v9)((function(e){return e.createOffer})).success,D=(0,f.v9)((function(e){return e.offerDelete})),O=D.error,I=D.loading,S=D.success;c.useEffect((function(){T&&T.isAdmin&&g((0,o.D9)())}),[g,T,S,k]);return(0,N.jsxs)(i.Z,{children:[p?(0,N.jsxs)("div",{children:[(0,N.jsx)(t.Z,{className:"sidebar-menu",variant:"primary",onClick:function(){return v(!0)},children:"menu"}),(0,N.jsxs)(m.Z,{show:n,onHide:function(){return v(!1)},children:[(0,N.jsx)(m.Z.Header,{closeButton:!0}),(0,N.jsx)(m.Z.Body,{children:(0,N.jsx)(j.Z,{})})]})]}):(0,N.jsx)(a.Z,{md:2,children:(0,N.jsx)(j.Z,{})}),(0,N.jsx)(a.Z,{md:10,children:(0,N.jsxs)("div",{className:"coupon-main",children:[(0,N.jsxs)(i.Z,{children:[(0,N.jsx)(a.Z,{children:(0,N.jsx)("h4",{className:"couponscreen-title",children:"Offer List"})}),(0,N.jsx)(a.Z,{className:"d-flex justify-content-end",children:(0,N.jsxs)(t.Z,{onClick:function(){b("/admin/offer/create")},className:"my-3",children:[(0,N.jsx)("i",{className:"fas fa-plus"})," Create New Offer"]})})]}),I&&(0,N.jsx)(x.Z,{}),O&&(0,N.jsx)(u.Z,{variant:"danger",children:O}),y?(0,N.jsx)(x.Z,{}):C?(0,N.jsx)(u.Z,{variant:"danger",children:C}):(0,N.jsxs)(d.Z,{bordered:!0,hover:!0,responsive:!0,className:"table-sm",children:[(0,N.jsx)("thead",{children:(0,N.jsxs)("tr",{className:"couponscreen-table-head",children:[(0,N.jsx)("td",{children:"OFFER ID"}),(0,N.jsx)("td",{children:"OFFER TITLE"}),(0,N.jsx)("td",{children:"CATEGORY"}),(0,N.jsx)("td",{children:"DISCOUNT PERCENTAGE"}),(0,N.jsx)("td",{children:"STATUS"}),(0,N.jsx)("td",{})]})}),(0,N.jsx)("tbody",{children:E.map((function(e){return(0,N.jsxs)("tr",{className:"couponscreen-table-main",children:[(0,N.jsx)("td",{children:e._id}),(0,N.jsx)("td",{children:e.title}),(0,N.jsx)("td",{children:e.category}),(0,N.jsx)("td",{children:e.discountPercentage}),(0,N.jsx)("td",{children:new Date(e.endDate).getTime()>(new Date).getTime()?(0,N.jsx)("i",{className:"fas fa-circle text-success"}):(0,N.jsx)("i",{className:"fas fa-circle text-danger"})}),(0,N.jsxs)("td",{children:[(0,N.jsx)(h.J,{to:"/admin/offer/".concat(e._id),children:(0,N.jsx)(t.Z,{variant:"light",className:"btn-sm",style:{color:"black"},children:(0,N.jsx)("i",{className:"fas fa-edit"})})}),"\xa0",(0,N.jsx)(t.Z,{variant:"danger",className:"btn-sm",onClick:function(){return s=e._id,void(window.confirm("Do you want to delete this coupon completely")&&g((0,o.SE)(s)));var s},children:(0,N.jsx)("i",{className:"fas fa-trash"})})]})]},e._id)}))})]})]})})]})}}}]);
//# sourceMappingURL=380.34256b77.chunk.js.map