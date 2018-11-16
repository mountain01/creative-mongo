const app = angular.module('app', []);

class MainCtrl {
  constructor(SpellService, scope) {
    this.title = 'temp';
    this.spellService = SpellService;
    this.scope = scope;
  }

  $onInit() {
    this.spellService.getSpells().then((spells) => {
      this.spells = spells;
      console.log('got spells');
    });
  }

  submitSpell(spell) {
    console.log(spell);
    this.scope.newSpell = null;
  }
}

MainCtrl.$inject = ['SpellService', '$scope'];

app.controller('MainCtrl', MainCtrl);
class SpellService {
  constructor($q) {
    this.promise = $q;
    this.spells = ['spell1', 'spell2'];
  }

  getSpells() {
    const prom = this.promise.defer();
    prom.resolve(this.spells);
    return prom.promise;
  }
}

SpellService.$inject = ['$q'];

app.service('SpellService', SpellService);
