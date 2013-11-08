
var testCtrl = TodosControllerForTests();

describe("changeStatus test", function(){
  it("check changeStatus result", function(){
      var changeStatusResult = testCtrl.changeStatus(testCtrl.roles.admin);
      expect(changeStatusResult.name).toBe("Admin");
  });
});

describe("removeElement test", function(){
  it("check rights before removeElement", function(){
      var removeElementResult = testCtrl.removeTodo(testCtrl.roles.user);
      expect(removeElementResult).toBe(false);
  });
});
