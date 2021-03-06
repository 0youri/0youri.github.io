function test()
{
    
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

            if ( typesearch !== "-1" && typesearch.search(find) === -1 )
            {
                document.getElementById(`quiz${i}`).style.display = "none";
                document.getElementById(`sautquiz${i}`).style.display = "none";
                
            }
            else
            {
                document.getElementById(`quiz${i}`).style.display = "block";
                document.getElementById(`sautquiz${i}`).style.display = "block";
            }
        }
    }
    else
    {
        for (let i = 1; i <= nbQuiz; i++)
        {
            document.getElementById(`quiz${i}`).style.display = "block";
            document.getElementById(`sautquiz${i}`).style.display = "block";
        }
    }
}

function Afficher(element)
{
    document.getElementById(`${element}`).style.display = "block";
    document.getElementById(`saut${element}`).style.display = "block";
    document.getElementById(`cacher${element}`).style.display = "block";
    document.getElementById(`afficher${element}`).style.display = "none";
}

function Cacher(element)
{
    document.getElementById(`${element}`).style.display = "none";
    document.getElementById(`saut${element}`).style.display = "none";
    document.getElementById(`cacher${element}`).style.display = "none";
    document.getElementById(`afficher${element}`).style.display = "block";
}

function ModifModal(element)
{
    document.getElementById(`${element}`);
    document.getElementById(`modifquiz`).setAttribute('onclick',`Modif('${element[4]}');`);
}

function Modif(element)
{
    if (document.getElementById(`modifnom`).value != "")
    {
        document.getElementById(`nomquiz${element}`).innerHTML = document.getElementById(`modifnom`).value;
        document.getElementById(`afficherquiz${element}`).innerHTML = `№${element} - ${document.getElementById(`modifnom`).value}`;
        document.getElementById(`cacherquiz${element}`).innerHTML = `№${element} - ${document.getElementById(`modifnom`).value}`;
    }
    if ( document.getElementById(`modiftype`).value != "" )
        document.getElementById(`typequiz${element}`).innerHTML = document.getElementById(`modiftype`).value;
    if ( document.getElementById(`modifdescription`).value != "" )
        document.getElementById(`descriptionquiz${element}`).innerHTML = document.getElementById(`modifdescription`).value;
    if ( document.getElementById(`modifniveau`).value != "-1" )
        document.getElementById(`niveauquiz${element}`).innerHTML = document.getElementById(`modifniveau`).value;
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
    id = document.getElementById(`afficher${element}`);
    id.parentNode.removeChild(id);
    id = document.getElementById(`cacher${element}`);
    id.parentNode.removeChild(id);
    id = document.getElementById(`saut${element}`);
    id.parentNode.removeChild(id);

    let nbQuiz = longueurQuiz()-1;

    if ( nbQuiz > 0 )
    {
        let pre_i = +element[4];
        if ( nbQuiz === 1 && Number(element[4]) === 1) pre_i = 1;
        for (let i = pre_i; i <= nbQuiz; i++)
        {
            document.getElementById(`quiz${i+1}`).id = `quiz${i}`;
            document.getElementById(`numberquiz${i+1}`).id = `numberquiz${i}`;
            document.getElementById(`nomquiz${i+1}`).id = `nomquiz${i}`;
            document.getElementById(`afficherquiz${i+1}`).id = `afficherquiz${i}`;
            document.getElementById(`cacherquiz${i+1}`).id = `cacherquiz${i}`;
            document.getElementById(`supprimerquiz${i+1}`).id = `supprimerquiz${i}`;
            document.getElementById(`modifquiz${i+1}`).id = `modifquiz${i}`;
            document.getElementById(`sautquiz${i+1}`).id = `sautquiz${i}`;

            document.getElementById(`typequiz${i+1}`).id = `typequiz${i}`;
            document.getElementById(`descriptionquiz${i+1}`).id = `descriptionquiz${i}`;
            document.getElementById(`niveauquiz${i+1}`).id = `niveauquiz${i}`;
            document.getElementById(`auteurquiz${i+1}`).id = `auteurquiz${i}`;


            document.getElementById(`afficherquiz${i}`).setAttribute('onclick',`Afficher('quiz${i}');`);
            document.getElementById(`cacherquiz${i}`).setAttribute('onclick',`Cacher('quiz${i}');`);
            document.getElementById(`supprimerquiz${i}`).setAttribute('onclick',`SupprimerModal('quiz${i}');`);
            document.getElementById(`modifquiz${i}`).setAttribute('onclick',`ModifModal('quiz${i}');`);

            document.getElementById("numberquiz" + i).innerHTML = i;
            
            let nomquiz = document.getElementById("nomquiz" + i).innerHTML;
            document.getElementById(`afficherquiz${i}`).innerHTML = `№${i} - ${nomquiz}`;
            document.getElementById(`cacherquiz${i}`).innerHTML = `№${i} - ${nomquiz}`;
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

function listQuiz()
{
    let nbQuiz = longueurQuiz();
    if ( nbQuiz != 0 )
    {
        for (let i = 1; i <= nbQuiz; i++)
        {
            document.getElementById("numberquiz" + i).innerHTML = i;

            let number = document.getElementById("numberquiz" + i).innerHTML;
            let nomquiz = document.getElementById("nomquiz" + i).innerHTML;

            document.getElementById('listAfficher').innerHTML += `<li class="dropdown-item" id="afficherquiz${i}"
            onclick="Afficher('quiz${i}');" style="display:none;">№${number} - ${nomquiz}</li>`;
            document.getElementById('listCacher').innerHTML += `<li class="dropdown-item" id="cacherquiz${i}"
            onclick="Cacher('quiz${i}');" style="display: block;" >№${number} - ${nomquiz}</li>`;
        }
    }

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
        `   <br id="sautquiz${nbQuiz+1}">
            <div class="card-body border rounded " id="quiz${nbQuiz+1}">
            <div class="position-relative">
            <div class="text-black fs-5">
            <strong>№<span id="numberquiz${nbQuiz+1}">${nbQuiz+1}</span> - 
            <span id="nomquiz${nbQuiz+1}">${nom}</span></strong>
            <span class="position-absolute end-0">
            <button class="btn btn-dark bi bi-info-circle-fill" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li class="dropdown-item">Type: <span id="typequiz${nbQuiz+1}">${type}</span></li>
            <li class="dropdown-item">Description: 
            <span id="descriptionquiz${nbQuiz+1}">${description}</span></li>
            <li class="dropdown-item">Niveau de difficulté:
            <span id="niveauquiz${nbQuiz+1}">${niveau}</span></li>
            <li class="dropdown-item">Date de création: ${date}</li>
            <li class="dropdown-item">Nom de l'auteur: <span id="auteurquiz${nbQuiz+1}">${auteur}</span></li>
            </ul>
            <button class="btn btn-dark bi bi-gear-fill" type="button" data-bs-toggle="modal" data-bs-target="#modifModal"id="modifquiz${nbQuiz+1}" 
            onclick="ModifModal('quiz${nbQuiz+1}');" ></button>
            <button class="btn btn-dark bi bi-x-circle-fill" type="button" data-bs-toggle="modal" data-bs-target="#supprimerModal" id="supprimerquiz${nbQuiz+1}" 
            onclick="SupprimerModal('quiz${nbQuiz+1}');"></button>
            </span>
            </div>
            </div>
            </div>
        `;
        document.getElementById('listAfficher').innerHTML += `<li class="dropdown-item" id="afficherquiz${nbQuiz+1}"
        onclick="Afficher('quiz${nbQuiz+1}');" style="display:none;">№${nbQuiz+1} - ${nom}</li>`;
        document.getElementById('listCacher').innerHTML += `<li class="dropdown-item" id="cacherquiz${nbQuiz+1}"
        onclick="Cacher('quiz${nbQuiz+1}');" style="display: block;" >№${nbQuiz+1} - ${nom}</li>`;
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
    
}
