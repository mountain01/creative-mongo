agGrid.initialiseAgGridWithAngular1(angular);

const app = angular.module('app', ['ui.router', 'agGrid']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouteProvider) {
  $stateProvider
    .state('home', { url: '/home', templateUrl: 'templates/home.html', controller: MainCtrl, controllerAs: '$ctrl' })
    .state('add', { url: '/add', templateUrl: 'templates/add.html', controller: AddCtrl, controllerAs: '$ctrl' });
  $urlRouteProvider.otherwise('home');
}])

class MainCtrl {
  constructor(SpellService, $q) {
    this.title = 'temp';
    this.$q = $q;
    this.spellService = SpellService;
  }
  $onInit() {
    // const columnDefs = [
    //   { headerName: "Make", field: "make" },
    //   { headerName: "Model", field: "model" },
    //   { headerName: "Price", field: "price" }
    // ];

    const levels = ['Cantrip'];
    for (let i = 1; i < 10; i++) {
      levels.push(i);
    }

    const columnDefs = [{
        headerName: 'Name',
        field: "name",
        editable: true,
        checkboxSelection: true
      },
      { editable: true, headerName: 'Casting Time', field: "castingTime" },
      { editable: true, headerName: 'Range', field: "range" },
      { editable: true, headerName: 'Duration', field: "duration" },
      {
        headerName: 'Level',
        field: "level",
        // editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
          values: levels,
        }
      },
      { editable: true, headerName: 'School', field: "school" },
      // { editable: true, headerName: 'Description', field: "description" },
      // { editable: true, headerName: 'Higher Levels', field: "higherLevels" },
    ]

    // const rowData = [
    //   { make: "Toyota", model: "Celica", price: 35000 },
    //   { make: "Ford", model: "Mondeo", price: 32000 },
    //   { make: "Porsche", model: "Boxter", price: 72000 }
    // ];

    this.gridOptions = {
      columnDefs: columnDefs,
      rowData: null,
      enableSorting: true,
      rowSelection: 'multiple',
      onCellValueChanged: ({ data }) => {
        this.spellService.updateSpell(data).then(console.log);
      },
      onGridReady: function(params) {
        params.api.sizeColumnsToFit();

        window.addEventListener('resize', function() {
          setTimeout(function() {
            params.api.sizeColumnsToFit();
          })
        })
      }
    };

    this.spellService.getSpells().then(res => this.gridOptions.api.setRowData(res));
  }

  canDelete() {
    return this.gridOptions.api.getSelectedRows().length > 0;
  }

  deleteSpell() {
    const toDelete = this.gridOptions.api.getSelectedRows();
    const deleteList = toDelete.map(a => this.spellService.deleteSpell(a))
    this.$q.all(deleteList).then(() => {
      const transaction = {
        remove: toDelete
      }
      this.gridOptions.api.updateRowData(transaction);
    });
  }


}

class AddCtrl {
  constructor(SpellService, scope) {
    this.spellService = SpellService;
    this.scope = scope;
  }

  $onInit() {
    this.resetSpell();
  }

  resetSpell() {
    this.scope.newSpell = { level: 'Cantrip' };
  }

  submitSpell(spell) {
    console.log(spell);
    this.spellService.saveSpell(spell).then(res => {
      console.log(res);
      this.resetSpell();
    });
  }

}

MainCtrl.$inject = ['SpellService', '$q'];
AddCtrl.$inject = ['SpellService', '$scope'];

app.controller('AddCtrl', AddCtrl);

app.controller('MainCtrl', MainCtrl);
class SpellService {
  constructor($q, $http) {
    this.promise = $q;
    this.spells = ['spell1', 'spell2'];
    this.http = $http;
  }

  getSpells() {
    return this.http.get('spells').then(res => res.data);
  }

  saveSpell(spell) {
    return this.http.post('/spells', spell).then(res => res.data);
  }

  updateSpell(spell) {
    return this.http.put(`/spells/${spell._id}`, spell).then(res => res.data);
  }

  deleteSpell(spell) {
    return this.http.delete(`/spells/${spell._id}`).then(res => res.data);
  }
}

SpellService.$inject = ['$q', '$http'];

app.service('SpellService', SpellService);
