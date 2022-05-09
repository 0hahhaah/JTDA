package ssafy;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

public class ThreadProducer
{
    public static Object Lock1 = new Object();
    public static Object Lock2 = new Object();

    public static void main( String[] args ) throws InterruptedException {

        TimerTask task = new TimerTask() {
            public void run() {
                for (int i = 0; i < 20; i++) {
                    // RUNNABLE
                    Thread basicThread = new Thread(new BasicThread(), "Thread-Basic-" + i);
                    basicThread.start();
                }
            }
        };

        Timer timer = new Timer("Timer");
        long delay = 3000;
        long period = 10000;
        timer.scheduleAtFixedRate(task, delay, period);

        // RUNNABLE && BLOCKED (synchronized method)
        for (int i = 0; i < 30; i++) {
            Thread syncThread = new Thread(new SynchronizedThread(), "Thread-Sync-" + i);
            syncThread.start();
        }
        Thread order = new Thread(new SynchronizedThread(), "Thread-FirstOrder");
        Thread newOrder = new Thread(new SynchronizedThread(), "Thread-SecondOrder");
        Thread newNewOrder = new Thread(new SynchronizedThread(), "Thread-ThirdOrder");

        order.start();
        newOrder.start();
        newNewOrder.start();

        // WAITING by orderEdit.join()
        Thread interruptedThread = new Thread(new InterruptedThread(), "Thread-EditWaitingOrder");
        interruptedThread.start();

        // TIMED_WAITING
        Thread timedWaitingOrder = new Thread(new timedWaitingThread(), "Thread-TimedWaiting");
        timedWaitingOrder.start();

        // Deadlock
        ThreadDeadLockOne T1 = new ThreadDeadLockOne();
        ThreadDeadLockTwo T2 = new ThreadDeadLockTwo();
        ThreadDeadLockOne T3 = new ThreadDeadLockOne();
        ThreadDeadLockTwo T4 = new ThreadDeadLockTwo();
        T1.start();
        T2.start();
        T3.start();
        T4.start();
    }

    private static class ThreadDeadLockOne extends Thread {
        public void run() {
            synchronized (Lock1) {

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}

                synchronized (Lock2) {
                }
            }
        }
    }
    private static class ThreadDeadLockTwo extends Thread {
        public void run() {
            synchronized (Lock2) {

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}

                synchronized (Lock1) {
                }
            }
        }
    }

    static class BasicThread implements Runnable {

        @Override
        public void run() {
            keepRunning();
        }

        public static void keepRunning() {
            while (true) {

            }
        }
    }

    static class SynchronizedThread implements Runnable {

        @Override
        public void run() {
            makeFood();
        }

        public static synchronized void makeFood() {
            while (true) {

            }
        }
    }

    static class InterruptingThread implements Runnable {

        @Override
        public void run() {
            try {
                Thread.sleep(30000);

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                e.printStackTrace();
            }
        }
    }

    static class InterruptedThread implements Runnable {

        @Override
        public void run() {
            Thread interruptingThread = new Thread(new InterruptingThread(), "InterruptingThread");
            interruptingThread.start();

            try {
                interruptingThread.join(); //
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                e.printStackTrace();
            }
        }
    }

    static class timedWaitingThread implements Runnable {

        @Override
        public void run() {
            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                e.printStackTrace();
            }
        }
    }
}





