
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

export async function inscrire(email, password) {
  let url = getEndpointURL(`/utilisateurs/signin/${email}/${password}`)
  let myInit = { method: 'POST'}
  let response = await fetch(url, myInit)

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
  console.log("test 2 ")
  console.log(idlist)
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
/*
export async function getList() {

  let response = await fetch('http://localhost:3000/listes');

  let data = await response.json()
  return data
}*/
export async function createItem(item) {
  // 👉 Faire une requête POST sur l'URL http://localhost:3000/posts grâce à
  // fetch
  // (cf https://slides.com/drazik/programmation-web-client-riche-la-programmation-asynchrone-en-js#/23)
  //let url = getEndpointURL('/posts')
  let response = await fetch('http://localhost:3000/listes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })

  // 👉 Parser la réponse en JSON
  let data = await response.json()

  if (response.status >= 300) {
    throw new Error(data.message)
  }
  
  // 👉 Renvoyer les données
  return data
}

export async function deleteItem(item) {
  // 👉 Faire une requête DELETE sur l'URL
  // http://localhost:3000/posts/{id du post} grâce à fetch
  // (cf https://slides.com/drazik/programmation-web-client-riche-la-programmation-asynchrone-en-js#/25)
  let url = getEndpointURL(`/posts/${item.id}`)
  await fetch(url, {
    method: 'DELETE',
  })
}