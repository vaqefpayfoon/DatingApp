import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_model/User';
import { UserService } from 'src/app/_services/userOld.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
//import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  @ViewChild('memberTabs', {static: false}) memberTabs: TabsetComponent;

  constructor(private userService: UserService, private alterify: AlertifyService,
    private route: ActivatedRoute) { }
    id: number;
    // galleryOptions: NgxGalleryOptions[];
    // galleryImages: NgxGalleryImage[];
  ngOnInit() {
    this.loadUser();

    // this.galleryOptions = [{
    //   width: '500px',
    //   height: '500px',
    //   imagePercent: 100,
    //   thumbnailsColumns: 4,
    //   imageAnimation: NgxGalleryAnimation.Slide,
    //   preview: false
    // }];

    // this.galleryImages = this.getImages();
  }
  loadUser(){
    //+this.route.snapshot.params['id']
    // this.route.params.subscribe(
    //   (params: Params) => {
    //       this.id = +params['id'];
    //       this.userService.getUser(this.id).subscribe((user: User) => {
    //         this.user = user;
    //       }, error => this.alterify.error (error));
    //   }
    // )
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
    });

  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imageUrls;
  }


  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
}
