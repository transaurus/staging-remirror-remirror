import { CreateExtensionPlugin } from '@remirror/core';
import { EditorView } from '@remirror/core';
import { PlainExtension } from '@remirror/core';

declare const COLORS: string[];
export { COLORS }
export { COLORS as COLORS_alias_1 }

declare interface CreateParticleProps {
    /**
     * x coordinate
     */
    x: number;
    /**
     * y coordinate
     */
    y: number;
    /**
     * Suggested color of the particle
     */
    color: string[] | number[];
    /**
     * Current color of the font being typed
     */
    textColor: string[] | number[];
    /**
     * The ctx of the canvas
     */
    ctx: CanvasRenderingContext2D;
    /**
     * The canvas element
     */
    canvas: HTMLCanvasElement;
}
export { CreateParticleProps }
export { CreateParticleProps as CreateParticleProps_alias_1 }

declare const defaultEffect: ParticleEffect;
export { defaultEffect }
export { defaultEffect as defaultEffect_alias_1 }

declare class EpicModeExtension extends PlainExtension<EpicModeOptions> {
    get name(): "epicMode";
    createPlugin(): CreateExtensionPlugin<EpicModePluginState>;
}
export { EpicModeExtension }
export { EpicModeExtension as EpicModeExtension_alias_1 }

declare interface EpicModeOptions {
    /**
     * The particle effect to use
     */
    particleEffect?: ParticleEffect;
    /**
     * Where in the dom the canvas element should be stored
     */
    getCanvasContainer?: () => HTMLElement;
    /**
     * The colors for the epic effect
     */
    colors?: string[];
    /**
     * Range for the particles
     */
    particleRange?: ParticleRange;
    /**
     * Whether epic mode is active.
     *
     * @defaultValue true
     */
    active?: boolean;
    /**
     * How long the shaking should last for.
     *
     * @defaultValue 0.3
     */
    shakeTime?: number;
    /**
     * How strong should the intensity of the shaking be.
     *
     * @defaultValue 5
     */
    shakeIntensity?: number;
}
export { EpicModeOptions }
export { EpicModeOptions as EpicModeOptions_alias_1 }

export declare class EpicModePluginState {
    #private;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    get options(): Readonly<Required<EpicModeOptions>>;
    private container;
    private view;
    constructor(extension: EpicModeExtension);
    /**
     * Store a reference to the Prosemirror view and add the canvas to the DOM
     *
     * @param view
     */
    init(view: EditorView): this;
    destroy(): void;
    shake: () => void;
    spawnParticles: () => void;
    /**
     * Runs through the animation loop
     */
    loop: () => void;
    private drawParticles;
}

declare type EpicModePluginStateProps = Required<EpicModeOptions>;
export { EpicModePluginStateProps }
export { EpicModePluginStateProps as EpicModePluginStateProps_alias_1 }

declare const heartEffect: ParticleEffect;
export { heartEffect }
export { heartEffect as heartEffect_alias_1 }

export declare const MAX_PARTICLES = 500;

declare interface Particle {
    x: number;
    y: number;
    alpha: number;
    color: string[] | number[];
    size: number;
    vx: number;
    vy: number;
    drag?: number;
    wander?: number;
    theta?: number;
}
export { Particle }
export { Particle as Particle_alias_1 }

export declare const PARTICLE_ALPHA_FADEOUT = 0.96;

export declare const PARTICLE_GRAVITY = 0.08;

export declare const PARTICLE_NUM_RANGE: {
    min: number;
    max: number;
};

export declare const PARTICLE_VELOCITY_RANGE: {
    readonly x: readonly [-1, 1];
    readonly y: readonly [-3.5, -1.5];
};

declare interface ParticleEffect {
    /**
     * Create a particle
     *
     * @param props
     */
    createParticle: (props: CreateParticleProps) => Particle;
    /**
     * Update the created particle (via mutation)
     *
     * @param props
     */
    updateParticle: (props: UpdateParticleProps) => void;
}
export { ParticleEffect }
export { ParticleEffect as ParticleEffect_alias_1 }

declare interface ParticleRange {
    min: number;
    max: number;
}
export { ParticleRange }
export { ParticleRange as ParticleRange_alias_1 }

declare const spawningEffect: ParticleEffect;
export { spawningEffect }
export { spawningEffect as spawningEffect_alias_1 }

declare interface UpdateParticleProps {
    particle: Particle;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
}
export { UpdateParticleProps }
export { UpdateParticleProps as UpdateParticleProps_alias_1 }

export declare const VIBRANT_COLORS: string[];

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      epicMode: EpicModeExtension;
    }
  }
}
