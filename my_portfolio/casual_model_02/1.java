import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {

        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < nums.length - 2; i++) {
            for (int j = i + 1; j < nums.length - 1; j++) {
                for (int k = j + 1; k < nums.length; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        // result.add(nums[i]);
                        // result.add(nums[j]);
                        // result.add(nums[k]);

                        // List<Integer> triplet = result.add(Arrays.asList(nums[i], nums[j], nums[k]));
                        List<Integer> triplet = Arrays.asList(nums[i], nums[j], nums[k]);

                        Collections.sort(triplet);

                        boolean duplicate = false;

                        for (List<Integer> l : result) {
                            if (l.equals(triplet)) {
                                duplicate = true;
                                break;
                            }
                        }

                        if (!duplicate) {
                            result.add(triplet);
                        }
                    }
                }
            }
        }

        // int ans [] = new Array(result.size);
        // for(int m=0; m<result.length ; m++){
        // ans = result.get(i);
        // }
        return result;

    }
}