const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');
const c4 = document.getElementById('c4');
const c5 = document.getElementById('c5');
const t2 = document.getElementById('t2');
const t3 = document.getElementById('t3');
const t4 = document.getElementById('t4');
const applications = document.querySelector('select[name="applications"]')
const lepays = document.getElementById('lepays');

function AjouterPays(){
    let pays = c5.value ;
    let existeDeja = lepays.getElementsByTagName('option');
    let paysExiste = false;

    for(let i = 0; i < existeDeja.length; i++){
        if(existeDeja[i].textContent === pays){
            paysExiste = true;
            break
        }
    }

    if(!paysExiste){
        const nouvOption = document.createElement('option')
        nouvOption.textContent = pays;
        lepays.appendChild(nouvOption);
    }else{
        alert('Le pays en question existe deja !!!');
    }
}
// Fonction pour verifier le formulaire cad verifer si les elements sont valides ou pas
function VerifierFormulaire(){
    verifiernom();
    verifieradresse();
    verifierpostal();
}

function verifiernom(){
    let nom = c1.value;
    if(/^[A-Za-z\s]{8,20}$/.test(nom)){
        t2.textContent = "";
        c1.style.borderColor = "green";  
    }else{
        t2.classList.add("error");
        t2.textContent = 'Nom invalide, le nom doit etre entre 8 et 20 caractere';
        c1.style.borderColor = "red";
    }
}
function verifieradresse(){
    let adresse = c2.value;
    if(adresse.length >= 20){
        t3.textContent = "";
        c2.style.outlineColor = "green";
        c2.style.borderColor = "green";  
    }else{
        t3.classList.add("error");
        t3.textContent = 'Adresse invalide, l\'adresse doit contenir 20 caractere minimum';
        c2.style.outlineColor = "red";
        c2.style.borderColor = "red";
    }
}
function verifierpostal(){
    let NoPostal = c3.value;
    if(NoPostal == 4000 || NoPostal == 3000 ){
        t4.textContent = "";
        c3.style.borderColor = "green";  
        if(NoPostal == 4000){
            c4.value = 'Ville2';
        }
        if(NoPostal == 3000){
            c4.value = 'Ville1';
        }
    }else{
        t4.classList.add("error");
        t4.textContent = 'Erreur, il faut choisir seulement 3000 ou 4000';
        c3.style.borderColor = "red";
    }
}

function AfficherAlert(){
    let genre = document.querySelector('input[name="civilite"]:checked')?.value;
    if (VerifierFormulaire()) {
        if (!genre) {
          alert("Veuillez sélectionner une civilité");
          return;
        }
    }
    alert(`Bonjour ${genre} ${c1.value}\nVotre adresse est ${c2.value}\nCP ${c3.value}\n${lepays.value}\n\nVotre No postal ${c3.value}\nVotre Localite ${c4.value}`);
}

function EnregistrementLocal(){
    let civilite = document.querySelector('input[name="civilite"]:checked')?.value;
    let nom_prenom = c1.value;
    let adresse = c2.value;
    let no_postal = c3.value;
    let localite = c4.value;
    let pays = lepays.value;
    let plateforme = [];
    document.querySelectorAll('input[name="materiel"]:checked').forEach(checkbox => {
        plateforme.push(checkbox.value);
    });
    let application = applications.value;

    localStorage.setItem('civilite', civilite);
    localStorage.setItem('nom_prenom', nom_prenom);
    localStorage.setItem('adresse', adresse);
    localStorage.setItem('no_postal', no_postal);
    localStorage.setItem('localite', localite);
    localStorage.setItem('pays', pays);
    localStorage.setItem('plateforme', JSON.stringify(plateforme));
    localStorage.setItem('application', application);

    alert('Donnees Enregistrer avec Succes !!!');
}

function Recuperation(){
    if(localStorage.getItem('civilite')){
        document.querySelector('input[name="civilite"]:checked')?.value = localStorage.getItem('civilite');
    }
    if(localStorage.getItem('nom_prenom')){
        c1.value = localStorage.getItem('nom_prenom');
    }
    if(localStorage.getItem('adresse')){
        c2.value = localStorage.getItem('adresse');
    }
    if(localStorage.getItem('no_postal')){
        c3.value = localStorage.getItem('no_postal');
    }
    if(localStorage.getItem('localite')){
        c4.value = localStorage.getItem('localite');
    }
    if(localStorage.getItem('pays')){
        lepays.value = localStorage.getItem('pays');
    }
    let plateforme = JSON.parse(localStorage.getItem('plateforme') || "[]");
    document.querySelectorAll('input[name="materiel"]:checked').forEach(checkbox => {
        checkbox.checked = plateforme.includes(checkbox.value);
    });
    if(localStorage.getItem('application')){
        applications.value = localStorage.getItem('application');
    }

    alert('Donees restaures avec succes !!!');
}
