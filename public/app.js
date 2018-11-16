const app = angular.module('app', []);

class MainCtrl {
  constructor(SpellService, scope) {
    this.title = 'temp';
    this.spellService = SpellService;
    this.scope = scope;
  }

  $onInit() {
    this.resetSpell();
    this.spellService.getSpells().then((spells) => {
      this.spells = spells;
      console.log('got spells');
    });
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

MainCtrl.$inject = ['SpellService', '$scope'];

app.controller('MainCtrl', MainCtrl);
class SpellService {
  constructor($q, $http) {
    this.promise = $q;
    this.spells = ['spell1', 'spell2'];
    this.http = $http;
  }

  getSpells() {
    const prom = this.promise.defer();
    prom.resolve(this.spells);
    return prom.promise;
  }

  saveSpell(spell) {
    return this.http.post('/spells', spell).then(res => res.data);
  }
}

SpellService.$inject = ['$q', '$http'];

app.service('SpellService', SpellService);
