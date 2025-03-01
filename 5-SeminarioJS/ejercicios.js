// Función para obtener un usuario de una API
function getUser(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener el usuario");
        return response.json();
      });
  }
  
  // Función para obtener los posts de un usuario
  function getPosts(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener los posts");
        return response.json();
      });
  }
  
  // Función para obtener los comentarios del post
  function getComments(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener comentarios del post");
        return response.json();
      });
  }
  


//ejercicio 1: JSON de todos los parametros de un user
getUser(2)
  .then((result)=>{
    console.log("Ejercicio 1: ")
    console.log(result)
  })
  .catch(error => console.error("Error:", error));




//ejercicio 2: Pedir los posts de un usuario
getUser(2)
 .then((user) => getPosts(user.id))
 .then(result=> {
  console.log("Ejercicio 2:")
  console.log(result)})
 .catch(error => console.error("Error:", error)); 

 

//ejercicio 3: pedir los comentarios de los posts
 getUser(2)
 .then(user => getPosts(user.id)) // Obtiene los posts del usuario
 .then(posts => Promise.all(posts.map(post => getComments(post.id)))) // Obtiene los comentarios de cada post en paralelo (gracias a Promise.all)
 .then(commentsArray => {
   console.log("Ejercicio 3: con promesas")
   commentsArray.forEach((comments, index) => {
     console.log(`Comentarios del post ${index}:`, comments);
   });
 })
 .catch(error => console.error("Error:", error));

 //usando async
 async function fetchOrderPostComments() {
  try {
    const user = await getUser(2);
    const posts = await getPosts(user.id);
    let comments = await Promise.all(posts.map(post => getComments(post.id))); // Obtiene los comentarios de cada post en paralelo (gracias a Promise.all)
    console.log("Ejercicio 3: con async")
    comments.forEach((comments, index) => {
        console.log(`Comentarios del post ${index}:`, comments);
      });
    console.log("Fin");
  } catch (error) {
    console.error("Error:", error);
  }
}
console.log("Inicio");

fetchOrderPostComments();



 //ejercicio 4: Usar 3 de las funciones de alto nivel combinadas (map, reduce, filte,...) con los datos. 


 getUser(2)
 .then((user) => getPosts(user.id))
 .then(posts => {
  console.log("Ejercicio 4: ")
  console.log(posts
  .filter((post) => post.id < 18)
  .sort((a,b) => b.id - a.id)
  .map((posts) => ({
  ...posts,
  initialDate: `${new Date().toLocaleDateString('es-ES')}`})))})
 .catch(error => console.error("Error:", error))




 

