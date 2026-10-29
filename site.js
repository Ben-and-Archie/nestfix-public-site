const tabs = [...document.querySelectorAll('[role="tab"]')];
const scenarios = [
  {label:'Votre signalement', title:'Une fuite sous l’évier', place:'Appartement 02 · Immeuble des Tilleuls', message:'« Il y a de l’eau sous l’évier de la cuisine. J’ai ajouté une photo pour vous montrer. »', status:'✓ Demande enregistrée', extra:true},
  {label:'Côté gestionnaire', title:'Les informations sont réunies', place:'Logement · Description · Pièce jointe', message:'La demande apparaît dans le tableau de suivi. Le gestionnaire peut la qualifier et organiser sa prise en charge.', status:'À qualifier', extra:false},
  {label:'Le suivi sur Telegram', title:'Le locataire garde le fil', place:'Une nouvelle étape, une information utile', message:'Exemple : « Votre demande a été attribuée. Vous serez informé des prochaines étapes prévues. »', status:'Suivi de la demande', extra:false}
];
function selectTab(index, moveFocus=false) {
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
  const scenario=scenarios[index];
  for(const field of ['label','title','place','message','status']) document.getElementById('demo-'+field).textContent=scenario[field];
  document.getElementById('demo-extra').hidden=!scenario.extra;
  document.getElementById('demo-panel').setAttribute('aria-labelledby',tabs[index].id);
  if(moveFocus) tabs[index].focus();
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectTab(index));
  tab.addEventListener('keydown',event=>{
    const indexes={ArrowRight:(index+1)%tabs.length,ArrowLeft:(index+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1};
    if(Object.hasOwn(indexes,event.key)){event.preventDefault();selectTab(indexes[event.key],true);}
  });
});
