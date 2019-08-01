import { Component, OnInit } from '@angular/core';
import { JsonPlaceholderService } from '../../service/json-placeholder.service';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';

export class Feed {
	author: any = ''
	message: any = ''
	liked: number = 0
	disliked: number = 0

	constructor(author = 'anon', message = '') {
		this.author = author
		this.message = message
	}
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
	posts: Feed[] = []
	feed = new Feed()
	constructor(public svc: JsonPlaceholderService) {}

	ngOnInit() {
		this.getPost()
	}

	post() {
		this.posts.push(this.feed)
		this.posts.reverse()
		this.feed = new Feed()
	}

	async getPost() {
		this.svc.getPosts().subscribe(response => {
			Object.keys(response).forEach(item => {
				this.feed.author = response[item].id + ": " + response[item].title
				this.feed.message = response[item].body
				console.log(this.feed)
				this.posts.push(this.feed)
				// this.posts.reverse()
				this.feed = new Feed()
			})
			// console.log(response)
		})
	}
	// async post() {
	// 	this.svc.getPosts().subscribe(resp => {
	// 		console.log(resp)
	// 		Object.keys(resp).forEach(item => {
	// 			// console.log(resp[item].title)
	// 			this.feed.author = resp[item].title
	// 			this.feed.message = resp[item].body
	// 			this.posts.push(this.feed)
	// 		})
	// 		this.posts.reverse()
	// 		this.feed = new Feed()
	// 	})
	// }
}
