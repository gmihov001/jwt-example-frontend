const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			characters: [],
			planets: []
		},
		actions: {
			logout: () => {
				setStore({ token: null });
			},
			login: (username, email) => {
				fetch("https://3000-f2025c8e-20db-40ce-bba4-1311de434fef.ws-us03.gitpod.io/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
						// add this to any fetch in headers  authorization: "Bearer " + store.token
					},

					body: JSON.stringify({
						email: email,
						username: username
					})
				})
					.then(response => response.json())
					.then(token => {
						if (typeof token.msg != "undefined") {
							// Notify.error(token.msg);
						} else {
							setStore({ token: token.jwt });
						}
					});
			},
			addFavorite: newItem => {
				var storeCopy = getStore();

				var newFavorites = storeCopy.favorites.find((element, index) => {
					return element != "Darth Vader";
				});

				setStore({ favorites: newFavorites });
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				// fetch().then().then(data => setStore({ characters: data }))
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
