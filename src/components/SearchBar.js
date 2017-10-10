import React, {Component} from 'react';
import {Label, List, Grid, Input} from 'semantic-ui-react'
import axios from 'axios';
import {map} from 'underscore';
import '../App.css';
import AlertContainer from 'react-alert';

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogID: '',
            data: {},
            notes: {},
        }
        this.fetchBlogger()
    }

    fetchBlogger(blogID) {
        axios.get(`https://clubfreetst.herokuapp.com/blogs/${blogID}`)
            .then(resp => {
                this.setState({data: resp.data})
                console.log(resp.data)
                console.log(resp.data.err)
                this.setState({notes: resp.data.notes})
            })
            .catch(err=>{
                console.log("err",err)
            })
        ;
    }

    onChange = (e) => {
        this.setState({blogID: e.target.value});
        if ((e.target.value < 10001 || e.target.value > 9999999 || e.target.value % 5 === 0 )&& !(e.target.value === null || e.target.value === '')) {
            this.msg.error('your input must be (5-7 digits) and mustn\'t divisible by 5',
                {
                    time: 800,
                })
        }
        if (e.target.value === null || e.target.value === '') {
            this.msg.info(' Site Id field empty',
                {
                    time:1000
                });
            this.setState({data:{}})
            this.setState({notes:{}})
        }
        this.fetchBlogger(e.target.value);
    }
    deleteNote = (e, noteId,title) => {
        this.delete(noteId)
        let blogPosts = this.state.notes.filter((post) => {
            return noteId !== post.id;
        })
        this.setState({notes: blogPosts})
        this.msg.success(`note ${title} deleted`, {
            time: 2000,
        })
    }

    delete(noteId) {
        axios.delete(`https://clubfreetst.herokuapp.com/notes/${noteId}`)
            .then(response => {
                console.log(response)
            });
    }

    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Label pointing='right'>Put your site ID,it must be (5-7 digits) and mustn't divisible by
                            5</Label>
                        <div className="ui icon input">
                            <Input icon='search' placeholder="Search" id="bloggerId"
                                   name="blogger"
                                   min="10001" max="9999999"
                                   size='large'
                                   type="number"
                                   onChange={this.onChange}/>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <div className="ui centered two column grid">
                        <div className="column">
                            <div className="container-middle">
                                <div className="ui grid centered">
                                    <div
                                        className="twelve-wide-computer fifteen-wide-tablet fifteen-wide-mobile column">
                                        <table basic='very' className="ui table">
                                            <thead className="">
                                            <tr className="">
                                                <td className="App-intro text-center">Blogger</td>
                                                <td className="App-intro text-center">Title</td>
                                                <td className="App-intro text-center">Note(s)</td>
                                            </tr>
                                            </thead>
                                            <tbody className="">
                                            <tr role="listitem" className="item">
                                                <td className="App-label text-center">{this.state.data.blogger}</td>
                                                <td className="App-label text-center">{this.state.data.title}</td>
                                                <td className="App-label text-center">
                                                    {map(this.state.notes, (a) => {
                                                        return (
                                                            <List key={a.id}>
                                                                <List.Item>
                                                                    <span onClick={e => this.deleteNote(e, a.id,a.title)}><i
                                                                        className="trash icon error-text cursor-pointer company-remove"></i></span>
                                                                    {a.title}
                                                                </List.Item>
                                                            </List>
                                                        );
                                                    })}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid.Row>
                <AlertContainer ref={a => this.msg = a}/>
            </Grid>
        )
    }
}

export default SearchBar;