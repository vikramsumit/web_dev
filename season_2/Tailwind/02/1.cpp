  // #include <bits/stdc++.h>
#include <iostream>
#include <vector>
#include <string>

using namespace std;

// Utility to print allocation result
void printAllocation(const string& title, const vector<int>& processSize, const vector<int>& allocation) {
    cout << "\n" << title << "\n";
    cout << "Process No.\tProcess Size\tBlock no.\n";
    for (size_t i = 0; i < processSize.size(); i++) {
        cout << " " << i + 1 << "\t\t" << processSize[i] << "\t\t";
        if (allocation[i] != -1) cout << allocation[i] + 1;
        else cout << "Not Allocated";
        cout << "\n";
    }
}

// First Fit: allocate the first block that is big enough
void firstFit(vector<int> blockSize, const vector<int>& processSize) {
    vector<int> allocation(processSize.size(), -1);
    for (size_t i = 0; i < processSize.size(); i++) {
        for (size_t j = 0; j < blockSize.size(); j++) {
            if (blockSize[j] >= processSize[i]) {
                allocation[i] = (int)j;
                blockSize[j] -= processSize[i];
                break;
            }
        }
    }
    printAllocation("First Fit Allocation", processSize, allocation);
}

// Best Fit: allocate the smallest block that is big enough
void bestFit(vector<int> blockSize, const vector<int>& processSize) {
    vector<int> allocation(processSize.size(), -1);
    for (size_t i = 0; i < processSize.size(); i++) {
        int bestIdx = -1;
        for (size_t j = 0; j < blockSize.size(); j++) {
            if (blockSize[j] >= processSize[i]) {
                if (bestIdx == -1 || blockSize[j] < blockSize[bestIdx]) {
                    bestIdx = (int)j;
                }
            }
        }
        if (bestIdx != -1) {
            allocation[i] = bestIdx;
            blockSize[bestIdx] -= processSize[i];
        }
    }
    printAllocation("Best Fit Allocation", processSize, allocation);
}

// Worst Fit: allocate the largest block available
void worstFit(vector<int> blockSize, const vector<int>& processSize) {
    vector<int> allocation(processSize.size(), -1);
    for (size_t i = 0; i < processSize.size(); i++) {
        int worstIdx = -1;
        for (size_t j = 0; j < blockSize.size(); j++) {
            if (blockSize[j] >= processSize[i]) {
                if (worstIdx == -1 || blockSize[j] > blockSize[worstIdx]) {
                    worstIdx = (int)j;
                }
            }
        }
        if (worstIdx != -1) {
            allocation[i] = worstIdx;
            blockSize[worstIdx] -= processSize[i];
        }
    }
    printAllocation("Worst Fit Allocation", processSize, allocation);
}

int main() {
    // Example input (can be changed for testing)
    vector<int> blocks = {100, 500, 200, 300, 600};
    vector<int> processes = {120, 225, 179, 125, 80};

    // Run all three strategies with fresh copies of blocks
    firstFit(blocks, processes);
    bestFit(blocks, processes);
    worstFit(blocks, processes);

    return 0;
}
