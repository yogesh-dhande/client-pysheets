import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/inputs/UIButton.vue";

describe("UIButton.vue", () => {
  it("Renders props.label when passed", () => {
    const label = "Click Here";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { label },
    });
    expect(wrapper.text()).toMatch(label);
  });
});
