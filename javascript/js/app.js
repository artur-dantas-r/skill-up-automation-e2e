const LIST = [
  {
    id: 1,
    name: "Mestre Yoda",
    age: 900,
    image: "images/yoda.png",
  },
  {
    id: 2,
    name: "Luke Skywalker",
    age: 25,
    image: "images/luke.png",
  },
  {
    id: 3,
    name: "Princesa Leia",
    age: 25,
    image: "images/leia.png",
  },
  {
    id: 4,
    name: "Han Solo",
    age: 35,
    image: "images/hansolo.png",
  },
  {
    id: 5,
    name: "Darth Vader",
    age: 45,
    image: "images/vader.png",
  },
  {
    id: 6,
    name: "Chewbacca",
    age: 200,
    image: "images/chewbacca.png",
  },
  {
    id: 7,
    name: "R2D2",
    age: 50,
    image: "images/r2d2.png",
  },
  {
    id: 8,
    name: "C3PO",
    age: 50,
    image: "images/c3po.png",
  },
];

const App = new Vue({
  el: "#app",
  data: {
    title: "Star Wars Lego",
    userName: "Artur",
    searchTerm: "",
    characters: LIST
  },
  computed: {
    filteredCharacters() {
      if (!this.searchTerm) return this.characters;
      const search = this.searchTerm.toLowerCase();
      return this.characters.filter(character => 
        character.name.toLowerCase().includes(search)
      );
    }
  },
  methods: {
    likeCharacter(name) {
      alert(`O personagem ${name} recebeu um like!`);
    },
    dislikeCharacter(name) {
      alert(`O personagem ${name} recebeu um dislike.`);
    },
    removeCharacter(id) {
      this.characters = this.characters.filter(character => character.id != id)
    },
    clearSearch() {
      this.searchTerm = "";
    }, 
    resetData() {
      this.characters = LIST
    }
  }
});
