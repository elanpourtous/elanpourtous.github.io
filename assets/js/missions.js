(() => {
  "use strict";

  const sources = [
    {
      title: "Département de la Vienne — Commande publique",
      url: "https://www.lavienne86.fr/le-departement/administration/espace-reglementaire/les-appels-a-projets/marches-publics",
      description: "Marchés, consultations et accès au vivier fournisseurs du Département.",
      action: "Proposer : formation des agents à l’IA inclusive, sensibilisation RGAA et accompagnement accessibilité.",
      themes: ["ia", "rgaa", "formation", "inclusion"],
      targets: ["public"],
      priority: 100
    },
    {
      title: "Plateforme marchés du Département 86",
      url: "https://marches.departement86.fr/",
      description: "Consultations dématérialisées et dossiers de marchés publics de la Vienne.",
      action: "Rechercher : formation, numérique, accessibilité, RGAA, intelligence artificielle, accompagnement.",
      themes: ["ia", "rgaa", "formation", "inclusion"],
      targets: ["public"],
      priority: 98
    },
    {
      title: "CNFPT — Intelligence artificielle",
      url: "https://www.cnfpt.fr/se-former/decouvrir-offres-thematiques/lintelligence-artificielle/national",
      description: "Offre IA destinée aux collectivités et agents territoriaux, avec déclinaisons régionales.",
      action: "Se positionner comme intervenant spécialisé IA inclusive, handicap et accessibilité des usages.",
      themes: ["ia", "formation", "inclusion"],
      targets: ["public", "training"],
      priority: 92
    },
    {
      title: "Emploi Territorial",
      url: "https://www.emploi-territorial.fr/",
      description: "Besoins numériques et de formation publiés par les collectivités territoriales.",
      action: "Surveiller les besoins transition numérique, médiation, formation des agents et inclusion.",
      themes: ["ia", "formation", "inclusion", "rgaa"],
      targets: ["public"],
      priority: 84
    },
    {
      title: "CCI de la Vienne — Transformation digitale",
      url: "https://www.poitiers.cci.fr/solutions/accompagner-la-transformation-digitale/",
      description: "Accompagnement des entreprises de la Vienne dans leurs projets numériques.",
      action: "Proposer un partenariat ou des ateliers IA inclusive et responsable pour les entreprises locales.",
      themes: ["ia", "formation", "inclusion"],
      targets: ["business", "training"],
      priority: 88
    },
    {
      title: "France Travail",
      url: "https://www.francetravail.fr/",
      description: "Offres et besoins de formateurs, conseillers numériques et intervenants IA.",
      action: "Chercher : formateur IA, formateur numérique, FPA, accessibilité numérique, Poitiers, Vienne.",
      themes: ["ia", "formation", "inclusion"],
      targets: ["business", "training"],
      priority: 74
    },
    {
      title: "Université de Poitiers — pédagogie numérique",
      url: "https://imedias.univ-poitiers.fr/pedagolab/",
      description: "Écosystème local autour des usages pédagogiques du numérique et de l’IA.",
      action: "Proposer une intervention complémentaire sur IA inclusive, accessibilité et formation des formateurs.",
      themes: ["ia", "formation", "inclusion"],
      targets: ["public", "training"],
      priority: 82
    },
    {
      title: "Marchés publics — Poitiers / Vienne",
      url: "https://www.e-marchespublics.com/appel-offre/nouvelle-aquitaine/vienne/poitiers",
      description: "Agrégateur de consultations localisées à Poitiers et dans la Vienne.",
      action: "Filtrer les prestations intellectuelles, formation, numérique et accompagnement.",
      themes: ["ia", "rgaa", "formation", "inclusion"],
      targets: ["public", "business"],
      priority: 78
    }
  ];

  const labels = {
    ia: "intelligence artificielle IA inclusive",
    rgaa: "RGAA accessibilité numérique",
    formation: "formation formateur FPA",
    inclusion: "inclusion numérique"
  };

  function score(source, theme, target) {
    let value = source.priority;
    if (theme !== "all" && source.themes.includes(theme)) value += 30;
    if (target !== "all" && source.targets.includes(target)) value += 20;
    return value;
  }

  function matches(source, theme, target) {
    const themeOk = theme === "all" || source.themes.includes(theme);
    const targetOk = target === "all" || source.targets.includes(target);
    return themeOk && targetOk;
  }

  function renderCard(source) {
    const article = document.createElement("article");
    article.className = "mission-card";

    const title = document.createElement("h3");
    title.textContent = source.title;

    const description = document.createElement("p");
    description.textContent = source.description;

    const action = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "Angle conseillé : ";
    action.append(strong, document.createTextNode(source.action));

    const link = document.createElement("a");
    link.className = "btn";
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Consulter la source";

    article.append(title, description, action, link);
    return article;
  }

  function runSearch(event) {
    if (event) event.preventDefault();

    const theme = document.getElementById("mission-theme").value;
    const target = document.getElementById("mission-target").value;
    const results = document.getElementById("mission-results");
    const status = document.getElementById("mission-status");
    const queryBox = document.getElementById("mission-query");
    const queryText = document.getElementById("mission-query-text");

    const filtered = sources
      .filter(source => matches(source, theme, target))
      .sort((a, b) => score(b, theme, target) - score(a, theme, target));

    results.replaceChildren();
    filtered.forEach(source => results.appendChild(renderCard(source)));

    const keyword = theme === "all"
      ? "IA inclusive RGAA accessibilité formation"
      : labels[theme];
    queryText.value = `${keyword} Poitiers Vienne 86 mission prestation marché public`;
    queryBox.hidden = false;

    status.textContent = `${filtered.length} source${filtered.length > 1 ? "s" : ""} prioritaire${filtered.length > 1 ? "s" : ""} trouvée${filtered.length > 1 ? "s" : ""}.`;
  }

  window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("mission-form");
    if (!form) return;
    form.addEventListener("submit", runSearch);
    runSearch();
  });
})();
