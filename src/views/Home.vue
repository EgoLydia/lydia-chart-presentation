<template>
  <div class="home">
    <top-nav></top-nav>
    <div class="grid-view">
      <div class="right-grid">
        <bar-chart
          :style="{ height: '100%', width: '100%' }"
          :chartData="chartData"
          :options="options"
        ></bar-chart>
      </div>
      <div class="left-grid">
        <pie-chart
          :style="{ height: '100%', width: '100%' }"
          :chartData="chartData"
          :options="options"
        ></pie-chart>
      </div>
      <div class="footer-grid">
        <table>
            <tr class="header">
              <th>Id</th>
              <th>Email</th>
              <th>Body</th>
              <th>View</th>
            </tr>
            <tr v-for="comment in comments" :key="comment.id">
              <td>{{comment.id}}</td>
              <td>{{comment.email}}</td>
              <td>{{comment.body}}</td>
              <td>{{comment.view}}</td>
            </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "../components/TopNav.vue";
import BarChart from "../components/BarChart.vue";
import PieChart from "../components/PieChart.vue";

export default {
  name: "Home",
  components: {
    "top-nav": TopNav,
    "bar-chart": BarChart,
    "pie-chart": PieChart,
  },
  data() {
    return {
      isBusy: false,
      loadingMessage: "",
      hasError: false,
      error: "",
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    comments() {
      return this.$store.getters.comments;
    },
    chartData() {
      return {
        labels: this.comments.map((comment) => comment.id),
        datasets: [
          {
            label: "comments",
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 205, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(201, 203, 207, 1)",
              'rgba(255, 99, 100, 1)',
              'rgba(255, 159, 103, 1)',
              'rgba(255, 205, 133, 1)',
              'rgba(75, 192, 57, 1)',
              'rgba(54, 162, 90, 1)',
              'rgba(153, 102, 230, 1)',
              'rgba(201, 203, 35, 1)',
              'rgba(255, 255, 64, 1)',
              'rgba(255, 99, 86, 1)',
              'rgba(75, 255, 192, 1)',
              'rgba(54, 153, 235, 1)',
              'rgba(153, 201, 255, 1)',
              'rgba(201, 255, 207, 1)'

            ],
            data: this.comments.map((comment) => comment.view),
          },
        ],
      };
    },
  },
  methods: {
    fetchComments() {
      this.isBusy = true;
      this.loadingMessage = "Fetching Comments";
      this.$store
        .dispatch("fetchComments")
        .then(() => {
          this.isBusy = false;
        })
        .catch((error) => {
          this.hasError = true;
          this.error = error;
        });
    },
  },
  mounted() {
    if (this.comments.length == 0) {
      this.fetchComments();
    }
  },
};
</script>

<style lang="scss" scoped>

@media (min-width: 1025px) {
  
  .grid-view {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 500px 500px;
    grid-template-areas:
      "right left"
      "footer footer";
    padding-right: 5rem;
    padding-left: 5rem;
    margin-top: -5rem;
  }

}  


@media (max-width:600px) {
     .grid-view{
    display: grid;
    min-height: 100vh;
    grid-template-columns: 100%;
    grid-template-rows: 500px 500px 500px;
    grid-template-areas:
      "right"
      "left"
      "footer";
    margin-top: -5rem;
  }

}
.right-grid {
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
  background-color: white;
  grid-area: right;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.left-grid {
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
  background-color: white;
  grid-area: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.footer-grid {
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
  background-color: white;
  grid-area: footer;
  overflow: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
table {
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

</style>