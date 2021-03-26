function test()
{
    
}

function AfficherCollapse(element)
{
    if ( document.getElementById(`${element}`).style.display === "none") document.getElementById(`${element}`).style.display = "block";
    else document.getElementById(`${element}`).style.display = "none";
}


function Contact()
{
    let prenom = document.getElementById('contactprenom').value;
    if ( prenom === "") document.getElementById('contactprenom').className = "form-control border-danger border-2";
    else document.getElementById('contactprenom').className = "form-control";

    let nom = document.getElementById('contactnom').value;
    if ( nom === "") document.getElementById('contactnom').className = "form-control border-danger border-2";
    else document.getElementById('contactnom').className = "form-control";

    let email = document.getElementById('contactemail').value;
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( email === "" || !re.test(email) )
    {
        document.getElementById('contactemail').className = "form-control border-danger border-2";
        document.getElementById('contactemail').value = "";
        email = "";
    }
    else document.getElementById('contactemail').className = "form-control";

    let message = document.getElementById('contactmessage').value;
    if ( message === "") document.getElementById('contactmessage').className = "form-control border-danger border-2";
    else document.getElementById('contactmessage').className = "form-control";

    if ( prenom === "" || nom === "" || email === "" || message === "" )
    {
        document.getElementById('etat_contact').innerHTML = "Le formulaire n'est pas completé!";
        document.getElementById('etat_contact').className = "alert alert-danger";
    }
    else
    {
        document.getElementById('contactprenom').value = document.getElementById('contactnom').value = document.getElementById('contactemail').value = 
        document.getElementById('contactmessage').value = "";
        document.getElementById('etat_contact').innerHTML = "Votre message a été ajouté avec succès!";
        document.getElementById('etat_contact').className = "alert alert-success";
    }
}

function Recherche()
{
    const find = document.getElementById('search').value;
    let nbQuiz = longueurQuiz();
    if ( find != "" )
    {
        for (let i = 1; i <= nbQuiz; i++)
        {
            let typesearch = document.getElementById('typesearch').value;
            if ( typesearch === "Nom") typesearch = `${document.getElementById(`nomquiz${i}`).innerHTML}`;
            else if ( typesearch === "Type") typesearch = `${document.getElementById(`typequiz${i}`).innerHTML}`;
            else if ( typesearch === "Niveau") typesearch = `${document.getElementById(`niveauquiz${i}`).innerHTML}`;
            else if ( typesearch === "Auteur") typesearch = `${document.getElementById(`auteurquiz${i}`).innerHTML}`;

            if ( typesearch !== "-1" && typesearch.search(find) === -1 ) document.getElementById(`quiz${i}`).style.display = "none";
            else document.getElementById(`quiz${i}`).style.display = "block";
        }
    }
    else
    {
        for (let i = 1; i <= nbQuiz; i++)
        {
            document.getElementById(`quiz${i}`).style.display = "block";
        }
    }
}

function ModifModal(element)
{
    clear_cache("modif");
    document.getElementById(`${element}`);
    document.getElementById(`modifquiz`).setAttribute('onclick',`Modif('${element[4]}');`);
}

function Modif(element)
{
    let success = false;
    if (document.getElementById(`modifnom`).value != "" )
    {
        document.getElementById(`nomquiz${element}`).innerHTML = document.getElementById(`modifnom`).value;
        document.getElementById('etat_modif').innerHTML = "Votre modification a été prise en compte!";
        document.getElementById('etat_modif').className = "alert alert-success";
        success = true;
    }
    if ( document.getElementById(`modiftype`).value != "" )
    {
        document.getElementById(`typequiz${element}`).innerHTML = document.getElementById(`modiftype`).value;
        success = true;
    }
    if ( document.getElementById(`modifdescription`).value != "" )
    {
        document.getElementById(`descriptionquiz${element}`).innerHTML = document.getElementById(`modifdescription`).value;
        success = true;
    }
    if ( document.getElementById(`modifniveau`).value != "-1" )
    {
        document.getElementById(`niveauquiz${element}`).innerHTML = document.getElementById(`modifniveau`).value;
        success = true;
    }
    if ( success )
    {
        document.getElementById('etat_modif').innerHTML = "Votre modification a été prise en compte!";
        document.getElementById('etat_modif').className = "alert alert-success";
    }
    else
    {
        document.getElementById('etat_modif').innerHTML = "Vous n'avez rien changé!";
        document.getElementById('etat_modif').className = "alert alert-warning";
    }
    document.getElementById(`modifnom`).value = document.getElementById(`modiftype`).value = 
    document.getElementById(`modifdescription`).value = "";
    document.getElementById(`modifniveau`).value = "-1";

}

function SupprimerModal(element)
{
    document.getElementById(`${element}`);
    document.getElementById(`supprimerquiz`).setAttribute('onclick',`Supprimer('${element}');`);
}


function Supprimer(element)
{
    let id = document.getElementById(element);
    id.parentNode.removeChild(id);

    let nbQuiz = longueurQuiz()-1;

    if ( nbQuiz > 0 )
    {
        let pre_i = +element[4];
        if ( nbQuiz === 1 && Number(element[4]) === 1) pre_i = 1;
        for (let i = pre_i; i <= nbQuiz; i++)
        {
            document.getElementById(`quiz${i+1}`).id = `quiz${i}`;
            document.getElementById(`nomquiz${i+1}`).id = `nomquiz${i}`;
            document.getElementById(`supprimerquiz${i+1}`).id = `supprimerquiz${i}`;
            document.getElementById(`modifquiz${i+1}`).id = `modifquiz${i}`;
            document.getElementById(`infoquiz${i+1}`).id = `infoquiz${i}`;
            document.getElementById(`collapsequiz${i+1}`).id = `collapsequiz${i}`;

            document.getElementById(`numberquiz${i+1}`).id = `numberquiz${i}`;
            document.getElementById(`typequiz${i+1}`).id = `typequiz${i}`;
            document.getElementById(`descriptionquiz${i+1}`).id = `descriptionquiz${i}`;
            document.getElementById(`niveauquiz${i+1}`).id = `niveauquiz${i}`;
            document.getElementById(`auteurquiz${i+1}`).id = `auteurquiz${i}`;


            document.getElementById(`supprimerquiz${i}`).setAttribute('onclick',`SupprimerModal('quiz${i}');`);
            document.getElementById(`modifquiz${i}`).setAttribute('onclick',`ModifModal('quiz${i}');`);
            document.getElementById(`infoquiz${i}`).setAttribute('onclick',`AfficherCollapse('collapsequiz${i}');`);

            document.getElementById("numberquiz" + i).innerHTML = i;            
        }
    }
}

function longueurQuiz()
{
    let nbQuiz = 0;
    let stop = false;
    while (!stop)
    {
        if ( document.getElementById("quiz" + [nbQuiz+1]) ) nbQuiz++;
        else if ( document.getElementById("quiz" + [nbQuiz+2]) ) nbQuiz++;
        else stop = true;
    }
    return nbQuiz;
}





function Ajouter()
{
    let nbQuiz = longueurQuiz();

    let nom = document.getElementById('ajoutnom').value;
    if ( nom === "") document.getElementById('ajoutnom').className = "form-control border-danger border-2";
    else document.getElementById('ajoutnom').className = "form-control";

    let type = document.getElementById('ajouttype').value;
    if ( type === "") document.getElementById('ajouttype').className = "form-control border-danger border-2";
    else document.getElementById('ajouttype').className = "form-control";

    let description = document.getElementById('ajoutdescription').value;
    if ( description === "") document.getElementById('ajoutdescription').className = "form-control border-danger border-2";
    else document.getElementById('ajoutdescription').className = "form-control";

    let niveau = document.getElementById('ajoutniveau').value;
    if ( niveau === "-1") document.getElementById('ajoutniveau').className = "form-select border-danger border-2";
    else document.getElementById('ajoutniveau').className = "form-select";

    let auteur = document.getElementById('ajoutauteur').value;
    if ( auteur === "") document.getElementById('ajoutauteur').className = "form-control border-danger border-2";
    else document.getElementById('ajoutauteur').className = "form-control";

    let ajd = new Date();
    let date = `${ajd.getDate()}/${ajd.getMonth()+1}/${ajd.getFullYear()}`;

    if ( nom !== "" && type !== "" && description !== "" && niveau !== "-1" && auteur !== "" )
    {
        document.getElementById('blockquiz').innerHTML += 
        `<div id="quiz${nbQuiz+1}">
            <br>
            <div class="card-body border rounded ">
                <div class="position-relative">
                    <div class="text-black fs-5">
                        <strong>№<span id="numberquiz${nbQuiz+1}">${nbQuiz+1}</span> - <span id="nomquiz${nbQuiz+1}">${nom}</span></strong>
                        <span class="position-absolute end-0">
                            <button class="btn btn-dark bi bi-info-circle-fill" type="button" id="infoquiz${nbQuiz+1}"
                            onclick="AfficherCollapse('collapsequiz${nbQuiz+1}');"></button>
                            <button class="btn btn-dark bi bi-gear-fill" type="button" data-bs-toggle="modal" data-bs-target="#modifModal"
                            id="modifquiz${nbQuiz+1}" onclick="ModifModal('quiz${nbQuiz+1}');" ></button>
                            <button class="btn btn-dark bi bi-x-circle-fill" type="button" data-bs-toggle="modal" data-bs-target="#supprimerModal" 
                            id="supprimerquiz${nbQuiz+1}" onclick="SupprimerModal('quiz${nbQuiz+1}');"></button>
                        </span>
                    </div>
                </div>
            </div>
            <div id="collapsequiz${nbQuiz+1}" style="display:none;">
                <br>
                <div class="card card-body">
                    <p>Type: <span id="typequiz${nbQuiz+1}">${type}</span></p>
                    <p>Description: <span id="descriptionquiz${nbQuiz+1}">${description}</span></p>
                    <p >Niveau de difficulté: <span id="niveauquiz${nbQuiz+1}">${niveau}</span></p>
                    <p >Date de création: ${date}</p>
                    <span>Nom de l'auteur: <span id="auteurquiz${nbQuiz+1}">${auteur}</span></span>
                </div>
            </div>
        </div>
        `;
        document.getElementById('ajoutnom').value = document.getElementById('ajouttype').value = document.getElementById('ajoutdescription').value = 
        document.getElementById('ajoutauteur').value = "";
        document.getElementById('ajoutniveau').value = "-1";
        document.getElementById('etat_ajouter').innerHTML = "Votre quiz a été ajouté avec succès!";
        document.getElementById('etat_ajouter').className = "alert alert-success";
    }
    else
    {
        document.getElementById('etat_ajouter').innerHTML = "Le formulaire n'est pas completé!";
        document.getElementById('etat_ajouter').className = "alert alert-danger";
    }
} 

function clear_cache(element)
{
    if ( element === "ajouter" )
    {
        // Modal Ajouter
        document.getElementById('ajoutnom').className = "form-control";
        document.getElementById('ajouttype').className = "form-control";
        document.getElementById('ajoutdescription').className = "form-control";
        document.getElementById('ajoutniveau').className = "form-select";
        document.getElementById('ajoutauteur').className = "form-control";
        
        document.getElementById('ajoutnom').value = document.getElementById('ajouttype').value = document.getElementById('ajoutdescription').value = 
        document.getElementById('ajoutauteur').value = "";
        document.getElementById('ajoutniveau').value = "-1";
        document.getElementById('etat_ajouter').innerHTML = "";
        document.getElementById('etat_ajouter').className = "";
    }
    else if ( element === "contact" )
    {
        // Modal Contact
        document.getElementById('contactprenom').className = "form-control";
        document.getElementById('contactnom').className = "form-control";
        document.getElementById('contactemail').className = "form-control";
        document.getElementById('contactmessage').className = "form-control";

        document.getElementById('etat_contact').innerHTML = "";
        document.getElementById('etat_contact').className = "";
        document.getElementById('contactprenom').value = document.getElementById('contactnom').value = document.getElementById('contactemail').value = 
        document.getElementById('contactmessage').value = "";
    }
    else if ( element === "modif" )
    {
        document.getElementById(`modifnom`).value = document.getElementById(`modiftype`).value = 
        document.getElementById(`modifdescription`).value = "";
        document.getElementById(`modifniveau`).value = "-1";
    }
    
}
