import { Component, OnInit } from '@angular/core';
import { JsonPlaceholderService } from '../../service/json-placeholder.service';

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
				// console.log(this.feed)
				this.posts.push(this.feed)
				this.feed = new Feed()
			})
		})
	}
}
