import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet,} from "react-native";
 
export default function App() {
const [usuario, setUsuario] = useState("");
const [perfil, setPerfil] = useState(null);
 
const buscarPerfil = async () => {
try {
const response = await fetch(
`https://api.github.com/users/${usuario}`
);
 
const data = await response.json();
 
if (data.message === "Not Found") {
alert("Usuário não encontrado!");
setPerfil(null);
return;
}
 
setPerfil(data);
} catch (error) {
console.log(error);
alert("Erro ao buscar usuário");
}
};
 
return (
<View style={styles.container}>
<Text style={styles.titulo}>Buscar Perfil GitHub</Text>
 
<TextInput
placeholder="Digite o GitHub"
value={usuario}
onChangeText={setUsuario}
style={styles.input}
/>
 
<TouchableOpacity
style={styles.botao}
onPress={buscarPerfil}
>
<Text style={styles.textoBotao}>Buscar</Text>
</TouchableOpacity>
 
{perfil && (
<View style={styles.card}>
<Image
source={{ uri: perfil.avatar_url }}
style={styles.foto}
/>
 
<Text style={styles.nome}>
{perfil.name || "Usuário encontrado"}
</Text>
 
<Text style={styles.github}>
{perfil.login}
</Text>
</View>
)}
</View>
);
}
 
const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
justifyContent: "center",
},
 
titulo: {
fontSize: 24,
fontWeight: "bold",
textAlign: "center",
marginBottom: 20,
},
 
input: {
borderWidth: 1,
borderColor: "#ccc",
borderRadius: 10,
padding: 12,
marginBottom: 10,
},
 
botao: {
backgroundColor: "#24292e",
padding: 12,
borderRadius: 10,
alignItems: "center",
},
 
textoBotao: {
color: "#fff",
fontSize: 16,
fontWeight: "bold",
},
 
card: {
marginTop: 30,
alignItems: "center",
},
 
foto: {
width: 150,
height: 150,
borderRadius: 75,
marginBottom: 15,
},
 
nome: {
fontSize: 22,
fontWeight: "bold",
},
 
github: {
fontSize: 18,
color: "gray",
},
});
