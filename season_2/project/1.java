import java.util.*;

class Process {
    int pid, at, bt, ct, tat, wt;

    Process(int pid, int at, int bt) {
        this.pid = pid;
        this.at = at;
        this.bt = bt;
    }
}

public class 1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of processes: ");
        int n = sc.nextInt();

        Process[] p = new Process[n];

        for (int i = 0; i < n; i++) {
            System.out.print("Enter Arrival Time and Burst Time for P" + (i + 1) + ": ");
            int at = sc.nextInt();
            int bt = sc.nextInt();
            p[i] = new Process(i + 1, at, bt);
        }

        Arrays.sort(p, Comparator.comparingInt(a -> a.at));

        int time = 0;
        for (int i = 0; i < n; i++) {
            if (time < p[i].at) {
                time = p[i].at; // CPU idle till process arrives
            }
            time += p[i].bt;
            p[i].ct = time;
            p[i].tat = p[i].ct - p[i].at;
            p[i].wt = p[i].tat - p[i].bt;
        }

        // Print results
        System.out.println("\nPID\tAT\tBT\tCT\tTAT\tWT");
        for (Process pr : p) {
            System.out.println("P" + pr.pid + "\t" + pr.at + "\t" + pr.bt + "\t" +
                               pr.ct + "\t" + pr.tat + "\t" + pr.wt);
        }

        // Average TAT and WT
        double avgTat = 0, avgWt = 0;
        for (Process pr : p) {
            avgTat += pr.tat;
            avgWt += pr.wt;
        }

        System.out.printf("\nAverage TAT = %.2f", avgTat / n);
        System.out.printf("\nAverage WT = %.2f\n", avgWt / n);

        sc.close();
    }
}
