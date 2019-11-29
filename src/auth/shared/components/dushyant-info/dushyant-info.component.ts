import { Component } from "@angular/core";

@Component({
  selector: "dushyant-info",
  template: `
    <div class="container">
      <div class="card mb-3" style="width: 400px; margin: auto">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src="./../../../../assets/img/DushProfile.jpg"
              class="card-img"
              alt="Dushyant Patel">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Dushyant Patel</h5>
              <p class="card-text">Web Developer / Front-end Developer / UI Architect</p>
              <p class="card-text">
                <a class="btn btn-secondary mr-2" href="https://www.linkedin.com/in/dushyantpatel/" target="_blank">LinkedIn</a>
                <a class="btn btn-secondary" href="https://github.com/dushyant" target="_blank">Github</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DushyantInfoComponent {

}
