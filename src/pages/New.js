import React, { Component } from 'react';
import api from '../services/api';

import './New.css';
//escrever componente en formato de clase
class New extends Component {
    state = {
        imagem: null,
        autor: '',
        local: '',
        descricao: '',
        hashtags: ''
    };
    //funções prorias deven ser escritas no formato arrow function para acessar o this
    //e => evento do html 
    handleChange = e => {
        /* setar o elemento state[nome do input html] */
        this.setState({ [e.target.name]: e.target.value });
    }

    handleImageChange = e => {
        this.setState({ imagem: e.target.files[0] });
    }

    //async para usar metodos da api com await
    handleSubmit = async e => {
        //evitar o comportamento padrão do submit 
        e.preventDefault();
        //console.log('logD state :', this.state);
        //se fose somente json
        //await api.post('posts', { autor: this.state.autor, })
        //necessário para multipart/form
        const data = new FormData();
        data.append('imagem', this.state.imagem);
        data.append('autor', this.state.autor);
        data.append('local', this.state.local);
        data.append('descricao', this.state.descricao);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);
        //direcionar para a pag inicial
        //props.history => propriedades da rota
        this.props.history.push('/');
    }
    //metodo render() obrigatorio
    render() {
        return (
            <form id="new-post" onSubmit={this.handleSubmit} >
                <input type="file" onChange={this.handleImageChange} />
                <input type="text" name="autor" placeholder="Autor do post" 
                    onChange={this.handleChange} value={this.state.autor} />
                <input type="text" name="local" placeholder="Local do post" 
                    onChange={this.handleChange} value={this.state.local} />
                <input type="text" name="descricao" placeholder="Descriçãa do post" 
                    onChange={this.handleChange} value={this.state.descricao} />
                <input type="text" name="hashtags" placeholder="Hashtags do post" 
                    onChange={this.handleChange} value={this.state.hashtags} />

                <button type="submit">Enviar</button>
            </form>
        );
    }
}

export default New;