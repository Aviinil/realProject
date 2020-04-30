
const BASE_URL = 'http://localhost:3000' // URL du serveur API qui fera les appels SQL

// ==================> A MODIFIER POUR L'ADAPTER A DES ITEMS DE LISTE

function getEndpointURL(endpoint) {
  return `${BASE_URL}${endpoint}`
}

export async function getList(IDutilisateur) {
  let url = getEndpointURL(`/listes/${IDutilisateur}`)
  let response = await fetch(url)

  // 👉 Parser la réponse en JSON
  let data = await response.json()
  
  // 👉 Renvoyer les données
  return data
}
export async function getTaches(IDListe) {
  let url = getEndpointURL(`/taches/${IDListe}`)
  let response = await fetch(url)

  // 👉 Parser la réponse en JSON
  let data = await response.json()
  
  // 👉 Renvoyer les données
  return data
}
export async function getEtapes(IDtache) {
  let url = getEndpointURL(`/etapes/${IDtache}`)
  let response = await fetch(url)

  // 👉 Parser la réponse en JSON
  let data = await response.json()
  
  // 👉 Renvoyer les données
  return data
}

export async function authentifier(email, password) {
  let url = getEndpointURL(`/utilisateurs/login/${email}/${password}`)
  let response = await fetch(url)
 
  // 👉 Parser la réponse en JSON
  let data = await response.json();

  // 👉 Renvoyer les données
  return data
}

export async function inscrire(compte) {
  let url = getEndpointURL(`/utilisateurs/signin`)

  let response = await fetch(url, { method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(compte)
  })

  // 👉 Parser la réponse en JSON
  let data = await response.json();

  // 👉 Renvoyer les données
  return data
}

export async function createList(list) {
  let url = getEndpointURL('/listes/ajout')

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(list)
  })

  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
  
}

export async function createTache(tache) {
  let url = getEndpointURL('/taches/ajout')

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tache)
  })

  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
  
}

export async function createEtape(etape) {
  let url = getEndpointURL('/etapes/ajout')

  let response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(etape)
  })

  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
  
}

export async function deleteList(idlist) {
  let url = getEndpointURL('/listes')

  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(idlist)
  })

  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
  
}

export async function deleteTache(idtache) {
  let url = getEndpointURL('/taches')
  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(idtache)
  })

  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
  
}

export async function deleteEtape(idetape) {
  let url = getEndpointURL('/etapes')

  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(idetape)
  })
 
  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
  
}

export async function updateEtape(etape) {
  let url = getEndpointURL('/etapes')

  let response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(etape)
  })
 
  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
  
}

export async function updateTache(tache) {
  let url = getEndpointURL('/taches')

  let response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tache)
  })
 
  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
  
}

export async function modifierTache(tache) {

  let url = getEndpointURL('/taches/modif')

  let response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tache)
  })
 
  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
}

export async function updateMail(mail) {

  let url = getEndpointURL('/email/modif')

  let response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mail)
  })
 
  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
}

export async function VerifMdp(email, mdp) {
  let url = getEndpointURL(`/parametres/verif/${email}/${mdp}`)
  let response = await fetch(url)
  // 👉 Parser la réponse en JSON
  let data = await response.json();

  // 👉 Renvoyer les données
  return data
}

export async function updateMdp(mdp) {

  let url = getEndpointURL('/mdp/modif')

  let response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mdp)
  })
 
  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
}

export async function verifUtilisateur(IDutilisateur) {
  let url = getEndpointURL(`/activate/${IDutilisateur}`)

  let response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tache)
  })
 
  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  return data
  
}