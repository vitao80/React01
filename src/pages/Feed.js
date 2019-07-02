import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

//escrever componente en formato de clase
class Feed extends Component {
    //todas as informações/variraveis da classe deven ser declaradas no state
    //dessa forma sao 'escutadas' as alterações para binding
    state = {
        feed: []
    };

    //o metodo componentDidMount é executado toda vez que é montado o componente (async opcional)
    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');
        //atualizar o array feed do state
        this.setState({ feed: response.data });
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        //escutar o eveno 'post' do socket servidor
        socket.on('post', newPost => {
            //colocar o newPost no topo do array post[] (...spread operator)
            this.setState({ feed: [newPost, ...this.state.feed] });
        });

        socket.on('like', likedPost => {
            //percorrer o feed, se o id for igual substituir pelo feed
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post)
            })
        });
    }

    handleLike = async id => {
        await api.post(`/posts/${id}/like`);
    }
    //metodo render() obrigatorio
    render() {
        return (
            <section id="post-list">
                { /* percorrer o array, usar () ao inves de {} para escrever o 'html'  */ }
                { this.state.feed.map(post => (
                    <article key={post._id}>    {/* key => facilita o react com os itens do array */}
                    <header>
                        <div className="user-info">
                            <span>{post.autor}</span>
                            <span className="place">{post.local}</span>
                        </div>
                        <img src={more} alt="Mais" />
                    </header>

                    <img src={`http://localhost:3333/files/${post.imagem}`} alt="" />

                    <footer>
                        <div className="actions">
                            { /* usar o arrow funcion no onClick para o react NAO executar a função e somente criar uma referencia */ }
                            <button type="button" onClick={() => this.handleLike(post._id)}>
                                <img src={like} alt="" />
                            </button>
                            <img src={comment} alt="" />
                            <img src={send} alt="" />
                        </div>

                        <strong>{post.likes} curtidas</strong>
                        <p>
                            {post.descricao}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
                ))}
            </section>      
        );
    }
}

export default Feed;