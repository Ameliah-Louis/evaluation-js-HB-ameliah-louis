$(document).ready(function() {
  // Sélection de toutes les options de couleur
  const colorOptions = $('.color-option');
  // Sélection du conteneur du formulaire
  const containerForm = $('.containerForm');

  // Parcours de chaque option de couleur
  colorOptions.each(function() {
    // Récupération de la couleur à partir de l'attribut data-color
    const color = $(this).data('color');
    // Appliquer la couleur de fond à l'option de couleur
    $(this).css('backgroundColor', color);

    // Ajout d'un écouteur d'événement lors du clic sur l'option de couleur
    $(this).on('click', function() {
      // Changement de la couleur de fond du formulaire en fonction de la couleur choisie
      containerForm.css('backgroundColor', color);
    });
  });

  // Définition de la classe "Livre" pour représenter un livre et générer l'élément HTML
  class Livre {
    constructor(titre, auteur, image, resume) {
      this.titre = titre;
      this.auteur = auteur;
      this.image = image;
      this.resume = resume;
    }

    genererElementHTML() {
      const livreCard = $('<div>').addClass('livre-card'); // Création d'une div pour représenter le livre

      const titreElement = $('<h3>').text(this.titre); // Création d'un élément h3 pour le titre
      livreCard.append(titreElement); // Ajout du titre à la div

      const auteurElement = $('<p>').text(`Auteur: ${this.auteur}`); // Création d'un élément paragraphe pour l'auteur
      livreCard.append(auteurElement); // Ajout de l'auteur à la div

      const panel = $('<div>').addClass('panel').hide(); // Création d'un panneau (div) pour afficher l'image et le résumé (masqué par défaut)
      livreCard.append(panel); // Ajout du panneau à la div

      const imageElement = $('<img>').attr('src', this.image); // Création d'un élément image
      panel.append(imageElement); // Ajout de l'image au panneau

      const resumeElement = $('<p>').text(`Résumé: ${this.resume}`); // Création d'un élément paragraphe pour le résumé
      panel.append(resumeElement); // Ajout du résumé au panneau

      const deleteButton = $('<span>').addClass('delete-button').text('Supprimer');
      deleteButton.on('click', function() {
        livreCard.remove(); // Suppression de la carte (livre) lors du clic sur le bouton de suppression
      });
      livreCard.append(deleteButton); // Ajout du bouton de suppression à la div

      livreCard.on('click', function() {
        panel.slideToggle();
        livreCard.toggleClass('panel-visible'); // Ajout/suppression de la classe pour l'indication visuelle
      });

      return livreCard; // Renvoi de l'élément HTML représentant le livre
    }
  }

  // Gestion de l'ajout de livre lors de la soumission du formulaire
  const livreForm = $('#livre-form');
  const livreListe = $('#livre-liste');

  livreForm.on('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi du formulaire et le rechargement de la page

    // Récupération des valeurs des champs du formulaire
    const titreInput = $('#titre');
    const auteurInput = $('#auteur');
    const imageInput = $('#image');
    const resumeInput = $('#resume');

    const titre = titreInput.val();
    const auteur = auteurInput.val();
    const image = imageInput.val();
    const resume = resumeInput.val();

    // Création d'un objet Livre avec les valeurs récupérées
    const livre = new Livre(titre, auteur, image, resume);

    // Génération de l'élément HTML représentant le livre
    const livreCard = livre.genererElementHTML();

    // Ajout de l'élément au conteneur des livres
    livreListe.append(livreCard);

    // Vidage des champs du formulaire
    titreInput.val('');
    auteurInput.val('');
    imageInput.val('');
    resumeInput.val('');
  });
});
